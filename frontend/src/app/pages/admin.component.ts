import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ApiService,
  ContactMessage,
  Hotel,
  Sight,
  Tour,
  Transport,
} from '../services/api.service';

type Tab = 'tours' | 'hotels' | 'sights' | 'transport' | 'messages';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="section">
      <div class="container">
        <p class="eyebrow">Панел за управление</p>
        <h1>Администрация</h1>

        @if (!authed()) {
          <div class="login">
            <p class="lede">Въведете админ токен, за да продължите.</p>
            <div class="login__row">
              <input
                type="password"
                placeholder="Admin token"
                [(ngModel)]="tokenInput"
                (keydown.enter)="login()"
              />
              <button (click)="login()">Вход</button>
            </div>
            @if (err()) {
              <div class="notice notice--err">{{ err() }}</div>
            }
          </div>
        } @else {
          <div class="tabs">
            @for (t of tabs; track t) {
              <button
                class="ghost"
                [class.is-active]="tab() === t"
                (click)="switchTab(t)"
              >
                {{ label(t) }}
              </button>
            }
            <button class="ghost" (click)="logout()">Изход</button>
          </div>

          @if (err()) {
            <div class="notice notice--err">{{ err() }}</div>
          }

          @switch (tab()) {
            @case ('tours') {
              <h2>Турове</h2>
              <form class="form-inline" (ngSubmit)="addTour()">
                <input [(ngModel)]="tourDraft.name" name="tn" placeholder="Име" required />
                <input [(ngModel)]="tourDraft.region" name="tr" placeholder="Регион" required />
                <input [(ngModel)]="tourDraft.duration_days" name="td" type="number" placeholder="Дни" required />
                <input [(ngModel)]="tourDraft.price_bgn" name="tp" type="number" placeholder="Цена" required />
                <input [(ngModel)]="tourDraft.image_url" name="ti" placeholder="Image URL" />
                <textarea [(ngModel)]="tourDraft.description" name="tdesc" placeholder="Описание" required></textarea>
                <button type="submit">Добави</button>
              </form>

              <ul class="list">
                @for (t of tours(); track t.id) {
                  <li>
                    <span>
                      <strong>{{ t.name }}</strong> — {{ t.region }}, {{ t.price_bgn }} лв
                    </span>
                    <button class="danger" (click)="removeTour(t.id)">Изтрий</button>
                  </li>
                }
              </ul>
            }

            @case ('hotels') {
              <h2>Хотели</h2>
              <form class="form-inline" (ngSubmit)="addHotel()">
                <input [(ngModel)]="hotelDraft.name" name="hn" placeholder="Име" required />
                <input [(ngModel)]="hotelDraft.city" name="hc" placeholder="Град" required />
                <input [(ngModel)]="hotelDraft.stars" name="hs" type="number" min="1" max="5" placeholder="Звезди" required />
                <input [(ngModel)]="hotelDraft.price_per_night_bgn" name="hp" type="number" placeholder="Цена/нощ" required />
                <input [(ngModel)]="hotelDraft.image_url" name="hi" placeholder="Image URL" />
                <textarea [(ngModel)]="hotelDraft.description" name="hdesc" placeholder="Описание" required></textarea>
                <button type="submit">Добави</button>
              </form>

              <ul class="list">
                @for (h of hotels(); track h.id) {
                  <li>
                    <span>
                      <strong>{{ h.name }}</strong> — {{ h.city }} ({{ h.stars }}★)
                    </span>
                    <button class="danger" (click)="removeHotel(h.id)">Изтрий</button>
                  </li>
                }
              </ul>
            }

            @case ('sights') {
              <h2>Забележителности</h2>
              <form class="form-inline" (ngSubmit)="addSight()">
                <input [(ngModel)]="sightDraft.name" name="sn" placeholder="Име" required />
                <input [(ngModel)]="sightDraft.location" name="sl" placeholder="Локация" required />
                <input [(ngModel)]="sightDraft.image_url" name="si" placeholder="Image URL" />
                <textarea [(ngModel)]="sightDraft.description" name="sdesc" placeholder="Описание" required></textarea>
                <button type="submit">Добави</button>
              </form>

              <ul class="list">
                @for (s of sights(); track s.id) {
                  <li>
                    <span>
                      <strong>{{ s.name }}</strong> — {{ s.location }}
                    </span>
                    <button class="danger" (click)="removeSight(s.id)">Изтрий</button>
                  </li>
                }
              </ul>
            }

            @case ('transport') {
              <h2>Транспорт</h2>
              <form class="form-inline" (ngSubmit)="addTransport()">
                <input [(ngModel)]="transportDraft.type" name="xt" placeholder="Вид" required />
                <input [(ngModel)]="transportDraft.route" name="xr" placeholder="Маршрут" required />
                <input [(ngModel)]="transportDraft.price_bgn" name="xp" type="number" placeholder="Цена" required />
                <textarea [(ngModel)]="transportDraft.description" name="xdesc" placeholder="Описание" required></textarea>
                <button type="submit">Добави</button>
              </form>

              <ul class="list">
                @for (x of transport(); track x.id) {
                  <li>
                    <span>
                      <strong>{{ x.type }}</strong> — {{ x.route }} ({{ x.price_bgn }} лв)
                    </span>
                    <button class="danger" (click)="removeTransport(x.id)">Изтрий</button>
                  </li>
                }
              </ul>
            }

            @case ('messages') {
              <h2>Съобщения от форма за контакт</h2>
              <ul class="list">
                @for (m of messages(); track m.id) {
                  <li class="msg">
                    <div>
                      <strong>{{ m.name }}</strong>
                      &lt;{{ m.email }}&gt; · {{ m.created_at | date: 'short' }}
                    </div>
                    @if (m.subject) {
                      <div class="msg__subj">{{ m.subject }}</div>
                    }
                    <p>{{ m.message }}</p>
                  </li>
                } @empty {
                  <li>Няма съобщения.</li>
                }
              </ul>
            }
          }
        }
      </div>
    </section>
  `,
  styles: [
    `
      .login {
        max-width: 420px;
        margin-top: 1rem;
      }

      .login__row {
        display: flex;
        gap: 0.5rem;
      }

      .tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 1rem 0 2rem;
      }

      .tabs .is-active {
        background: var(--ink);
        color: var(--bg);
        border-color: var(--ink);
      }

      .form-inline {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }

      .form-inline textarea {
        grid-column: 1 / -1;
        min-height: 70px;
      }

      .form-inline button {
        grid-column: 1 / -1;
        justify-self: start;
      }

      .list {
        list-style: none;
        padding: 0;
        margin: 0;
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: var(--surface);
      }

      .list li {
        padding: 0.75rem 1rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;
      }

      .list li + li {
        border-top: 1px solid var(--line);
      }

      .msg {
        flex-direction: column;
        align-items: stretch;
      }

      .msg__subj {
        font-weight: 500;
        color: var(--ink);
        margin-top: 0.25rem;
      }
    `,
  ],
})
export class AdminComponent {
  private readonly api = inject(ApiService);

  readonly tabs: Tab[] = ['tours', 'hotels', 'sights', 'transport', 'messages'];
  readonly tab = signal<Tab>('tours');

  readonly authed = signal(false);
  readonly err = signal<string | null>(null);
  tokenInput = '';
  private token = '';

  readonly tours = signal<Tour[]>([]);
  readonly hotels = signal<Hotel[]>([]);
  readonly sights = signal<Sight[]>([]);
  readonly transport = signal<Transport[]>([]);
  readonly messages = signal<ContactMessage[]>([]);

  tourDraft: Partial<Tour> = {};
  hotelDraft: Partial<Hotel> = {};
  sightDraft: Partial<Sight> = {};
  transportDraft: Partial<Transport> = {};

  label(t: Tab): string {
    return {
      tours: 'Турове',
      hotels: 'Хотели',
      sights: 'Забележителности',
      transport: 'Транспорт',
      messages: 'Съобщения',
    }[t];
  }

  login(): void {
    this.err.set(null);
    this.token = this.tokenInput.trim();
    if (!this.token) {
      this.err.set('Въведете токен.');
      return;
    }
    // Validate by trying a protected endpoint.
    this.api.messages(this.token).subscribe({
      next: (rows) => {
        this.authed.set(true);
        this.messages.set(rows);
        this.loadAll();
      },
      error: () => {
        this.err.set('Грешен токен.');
      },
    });
  }

  logout(): void {
    this.token = '';
    this.tokenInput = '';
    this.authed.set(false);
  }

  switchTab(t: Tab): void {
    this.tab.set(t);
    this.err.set(null);
  }

  private loadAll(): void {
    this.api.tours().subscribe((r) => this.tours.set(r));
    this.api.hotels().subscribe((r) => this.hotels.set(r));
    this.api.sightseeing().subscribe((r) => this.sights.set(r));
    this.api.transportation().subscribe((r) => this.transport.set(r));
  }

  addTour(): void {
    this.api.createTour(this.token, this.tourDraft).subscribe({
      next: (t) => {
        this.tours.update((list) => [...list, t]);
        this.tourDraft = {};
      },
      error: (e) => this.err.set(e?.error?.error ?? 'Грешка.'),
    });
  }

  removeTour(id: number): void {
    this.api.deleteTour(this.token, id).subscribe(() =>
      this.tours.update((list) => list.filter((t) => t.id !== id)),
    );
  }

  addHotel(): void {
    this.api.createHotel(this.token, this.hotelDraft).subscribe({
      next: (h) => {
        this.hotels.update((list) => [...list, h]);
        this.hotelDraft = {};
      },
      error: (e) => this.err.set(e?.error?.error ?? 'Грешка.'),
    });
  }

  removeHotel(id: number): void {
    this.api.deleteHotel(this.token, id).subscribe(() =>
      this.hotels.update((list) => list.filter((h) => h.id !== id)),
    );
  }

  addSight(): void {
    this.api.createSight(this.token, this.sightDraft).subscribe({
      next: (s) => {
        this.sights.update((list) => [...list, s]);
        this.sightDraft = {};
      },
      error: (e) => this.err.set(e?.error?.error ?? 'Грешка.'),
    });
  }

  removeSight(id: number): void {
    this.api.deleteSight(this.token, id).subscribe(() =>
      this.sights.update((list) => list.filter((s) => s.id !== id)),
    );
  }

  addTransport(): void {
    this.api.createTransport(this.token, this.transportDraft).subscribe({
      next: (x) => {
        this.transport.update((list) => [...list, x]);
        this.transportDraft = {};
      },
      error: (e) => this.err.set(e?.error?.error ?? 'Грешка.'),
    });
  }

  removeTransport(id: number): void {
    this.api.deleteTransport(this.token, id).subscribe(() =>
      this.transport.update((list) => list.filter((x) => x.id !== id)),
    );
  }
}
