import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService, Tour } from '../services/api.service';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <p class="eyebrow">Оферти</p>
        <h1>Турове из България</h1>
        <p class="lede">
          Внимателно подбрани маршрути – от еднодневни градски разходки до
          многодневни планински приключения.
        </p>

        @if (loading()) {
          <p>Зареждане…</p>
        } @else if (error()) {
          <div class="notice notice--err">{{ error() }}</div>
        } @else {
          <div class="grid">
            @for (tour of tours(); track tour.id) {
              <article class="card">
                @if (tour.image_url) {
                  <img
                    class="card__img"
                    [src]="tour.image_url"
                    [alt]="tour.name"
                    loading="lazy"
                  />
                }
                <div class="card__body">
                  <div class="card__meta">
                    {{ tour.region }} · {{ tour.duration_days }} дни
                  </div>
                  <h3 class="card__title">{{ tour.name }}</h3>
                  <p class="card__desc">{{ tour.description }}</p>
                  <div class="card__foot">
                    <span class="price">{{ tour.price_bgn }} лв</span>
                    <span class="card__meta">на човек</span>
                  </div>
                </div>
              </article>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class ToursComponent {
  private readonly api = inject(ApiService);

  readonly tours = signal<Tour[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.api.tours().subscribe({
      next: (rows) => {
        this.tours.set(rows);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Грешка при зареждане на турове.');
        this.loading.set(false);
      },
    });
  }
}
