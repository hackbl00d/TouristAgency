import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService, Sight } from '../services/api.service';

@Component({
  selector: 'app-sightseeing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <p class="eyebrow">Места за посещение</p>
        <h1>Забележителности</h1>
        <p class="lede">
          От манастирите в Рила до крепостите на Второто българско царство –
          най-важното, което си струва да видите.
        </p>

        @if (loading()) {
          <p>Зареждане…</p>
        } @else if (error()) {
          <div class="notice notice--err">{{ error() }}</div>
        } @else {
          <div class="grid">
            @for (sight of sights(); track sight.id) {
              <article class="card">
                @if (sight.image_url) {
                  <img
                    class="card__img"
                    [src]="sight.image_url"
                    [alt]="sight.name"
                    loading="lazy"
                  />
                }
                <div class="card__body">
                  <div class="card__meta">{{ sight.location }}</div>
                  <h3 class="card__title">{{ sight.name }}</h3>
                  <p class="card__desc">{{ sight.description }}</p>
                </div>
              </article>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class SightseeingComponent {
  private readonly api = inject(ApiService);

  readonly sights = signal<Sight[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.api.sightseeing().subscribe({
      next: (rows) => {
        this.sights.set(rows);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Грешка при зареждане на забележителности.');
        this.loading.set(false);
      },
    });
  }
}
