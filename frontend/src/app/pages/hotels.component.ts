import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService, Hotel } from '../services/api.service';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <p class="eyebrow">Места за нощувка</p>
        <h1>Партньорски хотели</h1>
        <p class="lede">
          Семейни хотели и бутикови къщи в различните краища на страната,
          проверени лично от нашия екип.
        </p>

        @if (loading()) {
          <p>Зареждане…</p>
        } @else if (error()) {
          <div class="notice notice--err">{{ error() }}</div>
        } @else {
          <div class="grid">
            @for (hotel of hotels(); track hotel.id) {
              <article class="card">
                @if (hotel.image_url) {
                  <img
                    class="card__img"
                    [src]="hotel.image_url"
                    [alt]="hotel.name"
                    loading="lazy"
                  />
                }
                <div class="card__body">
                  <div class="card__meta">
                    {{ hotel.city }} · {{ stars(hotel.stars) }}
                  </div>
                  <h3 class="card__title">{{ hotel.name }}</h3>
                  <p class="card__desc">{{ hotel.description }}</p>
                  <div class="card__foot">
                    <span class="price">{{ hotel.price_per_night_bgn }} лв</span>
                    <span class="card__meta">на нощувка</span>
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
export class HotelsComponent {
  private readonly api = inject(ApiService);

  readonly hotels = signal<Hotel[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.api.hotels().subscribe({
      next: (rows) => {
        this.hotels.set(rows);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Грешка при зареждане на хотели.');
        this.loading.set(false);
      },
    });
  }

  stars(n: number): string {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }
}
