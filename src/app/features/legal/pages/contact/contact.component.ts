import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeoService } from '../../../../core/services/seo.service';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, BreadcrumbComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly seo = inject(SeoService);

  readonly contactEmail = 'ashwini12tiwari@gmail.com';
  submitted = signal(false);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Contact HostCompare',
      description: 'Get in touch with the HostCompare team with questions, corrections or feedback.',
      path: '/contact',
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Frontend-only: no backend endpoint exists yet to actually send this message.
    this.submitted.set(true);
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }
}
