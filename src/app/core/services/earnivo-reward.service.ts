import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

// The query parameter Earnivo appends to this site's URL when it sends a
// visitor here from a Website Promotion campaign. Must match
// VERIFICATION_TOKEN_PARAM in the Earnivo backend - it is the whole
// handshake.
const TOKEN_PARAM = 'ev_token';

// sessionStorage, deliberately, not localStorage: the token belongs to one
// visit in one tab. A visitor who closes the tab and comes back tomorrow
// through a fresh Earnivo link should get that new link's token, never a
// stale one left behind on the device.
const TOKEN_KEY = 'earnivo:token';
const CLAIMED_KEY = 'earnivo:claimed';
const DISMISSED_KEY = 'earnivo:dismissed';

export type EarnivoRewardState =
  | 'inactive' // no token in this tab - the widget renders nothing
  | 'loading' // validating the token with Earnivo
  | 'waiting' // valid, still counting down the required visit time
  | 'ready' // time is up, the visitor may claim
  | 'claiming'
  | 'claimed'
  | 'error';

interface SessionResponse {
  campaignName: string;
  taskTitle: string;
  rewardAmount: string;
  requiredSeconds: number;
  remainingSeconds: number;
  status: string;
  alreadyCompleted: boolean;
  expired: boolean;
}

interface ConfirmResponse {
  status: string;
  rewardAmount: string | null;
  alreadyCompleted: boolean;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: { code: string; message: string };
}

/**
 * Drives the Earnivo visit-reward widget.
 *
 * The flow it implements, end to end: a visitor taps a Website Promotion
 * task in the Earnivo app, which opens this site with a one-time token in
 * the URL. That token is stashed in sessionStorage (so it survives the
 * visitor browsing around the site) and stripped from the address bar, then
 * validated against Earnivo, which answers with how much longer the visit
 * has to last. Once the countdown reaches zero the widget offers a claim
 * button, and clicking it posts the token back - that call is the only thing
 * that credits the reward.
 *
 * The countdown only advances while this tab is the one actually on screen:
 * it pauses the instant the tab is hidden, minimized, or the browser window
 * loses focus to another app, and resumes exactly where it left off once the
 * visitor is back. Without that guard a visitor could start the task, switch
 * away for the required duration, and come back to a already-finished timer
 * without ever having looked at the page - which defeats the point of a
 * "visit this site" task. That said, nothing here is trusted by Earnivo: the
 * countdown is a UX nicety, and the server independently re-checks how long
 * the visit actually lasted before it credits anything.
 */
@Injectable({ providedIn: 'root' })
export class EarnivoRewardService {
  private readonly isBrowser = typeof window !== 'undefined';

  readonly state = signal<EarnivoRewardState>('inactive');
  readonly secondsRemaining = signal(0);
  // The full visit length this campaign asks for, as configured by the agent
  // in Earnivo - kept alongside the countdown so the widget can draw real
  // progress instead of inferring a total from whatever it first saw.
  readonly requiredSeconds = signal(0);
  readonly rewardAmount = signal<string | null>(null);
  readonly campaignName = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);
  // True whenever the countdown is not currently ticking because this tab
  // isn't the active one - surfaced so the widget can tell the visitor why
  // the timer looks stalled instead of leaving them guessing.
  readonly paused = signal(false);

  readonly visible = computed(() => this.state() !== 'inactive');

  private token: string | null = null;
  private countdown?: ReturnType<typeof setInterval>;
  private visibilityHandler?: () => void;

  /**
   * Called once from the reward widget when it mounts. Safe to call twice -
   * a second call while a session is already live is ignored rather than
   * restarting the countdown.
   */
  init(): void {
    if (!this.isBrowser || this.state() !== 'inactive') return;
    if (!environment.earnivoApiKey) return; // Not an Earnivo-enabled deployment.

    this.token = this.readToken();
    if (!this.token) return;

    // A visitor who explicitly closed the card on a finished task (claimed,
    // or a dead link) already saw everything it had to say - a refresh
    // shouldn't put it back in front of them. This is checked before the
    // claimed-state below on purpose: closing a completed claim is the exact
    // case this guards.
    if (this.read(DISMISSED_KEY) === this.token) return;

    // A visitor who already claimed in this tab shouldn't be offered the
    // button again just because they navigated to another page.
    if (this.readClaimed() === this.token) {
      this.state.set('claimed');
      return;
    }

    this.state.set('loading');
    void this.loadSession(this.token);
  }

  async claim(): Promise<void> {
    if (!this.token || this.state() !== 'ready') return;
    this.state.set('claiming');
    this.errorMessage.set(null);

    try {
      const data = await this.post<ConfirmResponse>('/website-verification/confirm', this.token);
      this.rewardAmount.set(data.rewardAmount ?? this.rewardAmount());
      this.writeClaimed(this.token);
      this.state.set('claimed');
    } catch (error) {
      this.errorMessage.set(this.messageFor(error));
      // Back to 'ready', not 'error': a failed claim (flaky network, a
      // few seconds short) is retryable, and dropping the button would
      // strand the visitor with a reward they earned and cannot take.
      this.state.set('ready');
    }
  }

  dismiss(): void {
    this.stopCountdown();
    // Only a terminal state (claimed, or a dead link) is remembered past
    // this tab session. Closing the card mid-task (waiting/ready) is treated
    // as "hide for now", not "forget this" - the visitor still has an unpaid
    // reward waiting, and a refresh should still offer it to them rather
    // than silently drop it.
    if (this.token && (this.state() === 'claimed' || this.state() === 'error')) {
      this.write(DISMISSED_KEY, this.token);
    }
    this.state.set('inactive');
  }

  private async loadSession(token: string): Promise<void> {
    try {
      const data = await this.post<SessionResponse>('/website-verification/session', token);
      this.campaignName.set(data.campaignName);
      this.rewardAmount.set(data.rewardAmount);

      if (data.alreadyCompleted) {
        this.writeClaimed(token);
        this.state.set('claimed');
        return;
      }
      if (data.expired) {
        this.errorMessage.set('This reward link has expired. Start the task again in the Earnivo app.');
        this.state.set('error');
        return;
      }

      this.requiredSeconds.set(data.requiredSeconds);
      this.secondsRemaining.set(data.remainingSeconds);
      if (data.remainingSeconds <= 0) {
        this.state.set('ready');
        return;
      }
      this.state.set('waiting');
      this.startCountdown();
    } catch (error) {
      this.errorMessage.set(this.messageFor(error));
      this.state.set('error');
    }
  }

  // --- Countdown, gated on the tab actually being on screen ---------------

  private startCountdown(): void {
    this.stopCountdown();
    this.attachVisibilityWatch();
    this.syncCountdown();
  }

  private stopCountdown(): void {
    if (this.countdown) clearInterval(this.countdown);
    this.countdown = undefined;
    this.detachVisibilityWatch();
    this.paused.set(false);
  }

  /**
   * Whether this tab is the one the visitor is actually looking at right
   * now. `visibilityState` catches a switched or minimized tab; `hasFocus`
   * additionally catches the browser window losing OS focus to another
   * application while still technically "visible" on screen, which the
   * Page Visibility API alone does not report as hidden.
   */
  private isPageActive(): boolean {
    return document.visibilityState === 'visible' && document.hasFocus();
  }

  private attachVisibilityWatch(): void {
    if (this.visibilityHandler) return;
    this.visibilityHandler = () => this.syncCountdown();
    document.addEventListener('visibilitychange', this.visibilityHandler);
    window.addEventListener('focus', this.visibilityHandler);
    window.addEventListener('blur', this.visibilityHandler);
  }

  private detachVisibilityWatch(): void {
    if (!this.visibilityHandler) return;
    document.removeEventListener('visibilitychange', this.visibilityHandler);
    window.removeEventListener('focus', this.visibilityHandler);
    window.removeEventListener('blur', this.visibilityHandler);
    this.visibilityHandler = undefined;
  }

  /**
   * Starts or stops the ticking interval to match whether the page is
   * currently active, without ever touching `secondsRemaining` itself here -
   * so going inactive simply freezes the countdown exactly where it was,
   * and coming back resumes it from that same point.
   */
  private syncCountdown(): void {
    if (this.state() !== 'waiting') return;
    const active = this.isPageActive();
    this.paused.set(!active);

    if (active && !this.countdown) {
      this.countdown = setInterval(() => this.tick(), 1000);
    } else if (!active && this.countdown) {
      clearInterval(this.countdown);
      this.countdown = undefined;
    }
  }

  private tick(): void {
    const next = this.secondsRemaining() - 1;
    this.secondsRemaining.set(Math.max(0, next));
    if (next <= 0) {
      this.stopCountdown();
      this.state.set('ready');
    }
  }

  // --- Token plumbing -----------------------------------------------------

  /**
   * Prefers a token in the current URL (a fresh arrival from the Earnivo
   * app) over one already in sessionStorage, so a visitor who comes back
   * through a second campaign link isn't stuck on the first visit's token.
   * The parameter is stripped from the address bar either way: it is a
   * single-use credential, and leaving it in the URL invites it into
   * bookmarks, shared links and referrer headers.
   */
  private readToken(): string | null {
    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get(TOKEN_PARAM);

    if (fromUrl) {
      this.write(TOKEN_KEY, fromUrl);
      url.searchParams.delete(TOKEN_PARAM);
      window.history.replaceState({}, '', url.toString());
      return fromUrl;
    }

    return this.read(TOKEN_KEY);
  }

  private readClaimed(): string | null {
    return this.read(CLAIMED_KEY);
  }

  private writeClaimed(token: string): void {
    this.write(CLAIMED_KEY, token);
  }

  // Every sessionStorage access is wrapped: private-mode browsers and
  // storage-blocking settings throw on the very first read, and a reward
  // widget must never be what breaks the page it sits on.
  private read(key: string): string | null {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private write(key: string, value: string): void {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      // Storage unavailable - the visit still works, it just can't survive
      // a navigation to another page on this site.
    }
  }

  private async post<T>(path: string, token: string): Promise<T> {
    const response = await fetch(`${environment.earnivoApiBaseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: environment.earnivoApiKey, token }),
    });

    const body = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;
    if (!response.ok || !body?.success) {
      throw new Error(body?.error?.message ?? 'Could not reach Earnivo. Please try again.');
    }
    return body.data;
  }

  private messageFor(error: unknown): string {
    return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
  }
}
