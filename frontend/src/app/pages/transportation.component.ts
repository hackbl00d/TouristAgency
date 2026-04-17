import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService, Transport } from '../services/api.service';

@Component({
  selector: 'app-transportation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="container">
        <p class="eyebrow">Придвижване</p>
        <h1>Транспорт</h1>
        <p class="lede">
          Информация за основните маршрути и ориентировъчни цени на основните
          направления в страната.
        </p>

        @if (loading()) {
          <p>Зареждане…</p>
        } @else if (error()) {
          <div class="notice notice--err">{{ error() }}</div>
        } @else {
          <div class="table">
            <div class="table__head">
              <span>Вид</span>
              <span>Маршрут</span>
              <span>Цена</span>
              <span>Описание</span>
            </div>
            @for (row of rows(); track row.id) {
              <div class="table__row">
                <span>{{ row.type }}</span>
                <span>{{ row.route }}</span>
                <span class="price">{{ row.price_bgn }} лв</span>
                <span>{{ row.description }}</span>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .table {
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: var(--surface);
        overflow: hidden;
      }

      .table__head,
      .table__row {
        display: grid;
        grid-template-columns: 1fr 1.4fr 0.8fr 2fr;
        gap: 1rem;
        padding: 0.9rem 1.1rem;
        align-items: center;
      }

      .table__head {
        background: var(--bg-alt);
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--muted);
      }

      .table__row + .table__row {
        border-top: 1px solid var(--line);
      }

      @media (max-width: 720px) {
        .table__head {
          display: none;
        }

        .table__row {
          grid-template-columns: 1fr;
          gap: 0.25rem;
          padding: 1rem 1.1rem;
        }
      }
    `,
  ],
})
export class TransportationComponent {
  private readonly api = inject(ApiService);

  readonly rows = signal<Transport[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.api.transportation().subscribe({
      next: (rows) => {
        this.rows.set(rows);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Грешка при зареждане на транспорт.');
        this.loading.set(false);
      },
    });
  }
}
