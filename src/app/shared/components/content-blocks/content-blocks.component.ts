import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GuideContentBlock } from '../../../core/models';

/**
 * Renders structured content blocks (paragraph/heading/list/table/code/quote)
 * as safe, semantic HTML — never via innerHTML. Shared by guide articles and
 * legal pages so both stay consistent and avoid duplicating this switch.
 */
@Component({
  selector: 'app-content-blocks',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="content-blocks">
      @for (block of blocks(); track $index) {
        @switch (block.type) {
          @case ('paragraph') { <p>{{ block.text }}</p> }
          @case ('heading') {
            @if (block.level === 2) { <h2 [id]="block.id">{{ block.text }}</h2> }
            @if (block.level === 3) { <h3 [id]="block.id">{{ block.text }}</h3> }
          }
          @case ('list') {
            @if (block.ordered) {
              <ol>@for (item of block.items; track item) { <li>{{ item }}</li> }</ol>
            } @else {
              <ul>@for (item of block.items; track item) { <li>{{ item }}</li> }</ul>
            }
          }
          @case ('table') {
            <div class="content-blocks__table-wrap">
              <table>
                <thead><tr>@for (header of block.headers; track header) { <th scope="col">{{ header }}</th> }</tr></thead>
                <tbody>
                  @for (row of block.rows; track $index) {
                    <tr>@for (cell of row; track cell) { <td>{{ cell }}</td> }</tr>
                  }
                </tbody>
              </table>
            </div>
          }
          @case ('code') { <pre><code>{{ block.code }}</code></pre> }
          @case ('quote') { <blockquote>{{ block.text }}</blockquote> }
        }
      }
    </div>
  `,
  styles: `
    .content-blocks h2 {
      font-size: 1.25rem;
      margin-top: 30px;
    }
    .content-blocks h3 {
      font-size: 1.05rem;
      margin-top: 20px;
    }
    .content-blocks p,
    .content-blocks li {
      color: var(--color-text);
      font-size: 0.96rem;
    }
    .content-blocks ul,
    .content-blocks ol {
      margin-bottom: 1em;
    }
    .content-blocks__table-wrap {
      overflow-x: auto;
      margin: 20px 0;
    }
    .content-blocks table {
      width: 100%;
      min-width: 480px;
      border-collapse: collapse;
    }
    .content-blocks th,
    .content-blocks td {
      padding: 10px 14px;
      border: 1px solid var(--color-border);
      font-size: 0.87rem;
      text-align: left;
    }
    .content-blocks th {
      background: var(--color-surface-alt);
    }
    .content-blocks pre {
      background: var(--color-surface-alt);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 16px;
      overflow-x: auto;
      font-size: 0.85rem;
      margin: 20px 0;
    }
    .content-blocks blockquote {
      border-left: 3px solid var(--color-primary);
      padding: 4px 16px;
      color: var(--color-text-muted);
      font-style: italic;
      margin: 20px 0;
    }
  `,
})
export class ContentBlocksComponent {
  blocks = input.required<GuideContentBlock[]>();
}
