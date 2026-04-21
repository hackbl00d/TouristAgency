import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApiService, TeamMember } from '../services/api.service';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const AGENCY_EMAIL = 'alex.vesely07@gmail.com';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="section">
      <div class="container">
        <p class="eyebrow">Нашият екип</p>
        <h1>Контакти</h1>
        <p class="lede">
          Запознайте се с хората зад агенцията и ни пишете – отговаряме в
          рамките на работния ден.
        </p>

        @if (teamLoading()) {
          <p>Зареждане…</p>
        } @else {
          <div class="grid team">
            @for (member of team(); track member.id) {
              <article class="card">
                <div class="card__body">
                  <div class="card__meta">{{ member.role }}</div>
                  <h3 class="card__title">{{ member.full_name }}</h3>
                  @if (member.bio) {
                    <p class="card__desc">{{ member.bio }}</p>
                  }
                  <div class="contact-lines">
                    @if (member.email) {
                      <a href="mailto:{{ member.email }}">{{ member.email }}</a>
                    }
                    @if (member.phone) {
                      <span>{{ member.phone }}</span>
                    }
                  </div>
                </div>
              </article>
            }
          </div>
        }
      </div>
    </section>

    <section class="section section--alt">
      <div class="container form-wrap">
        <p class="eyebrow">Форма за контакт</p>
        <h2>Пишете ни</h2>
        <p class="lede">
          Попълнете формата и натиснете „Изпрати“ – ще се отвори Вашият
          пощенски клиент с готово съобщение към нас.
        </p>

        <form (ngSubmit)="sendMail()" #f="ngForm" class="form">
          <div class="row">
            <div>
              <label for="name">Име</label>
              <input
                id="name"
                name="name"
                [(ngModel)]="form.name"
                required
                minlength="2"
              />
            </div>
            <div>
              <label for="email">Имейл</label>
              <input
                id="email"
                name="email"
                type="email"
                [(ngModel)]="form.email"
                required
              />
            </div>
          </div>

          <label for="subject">Тема</label>
          <input id="subject" name="subject" [(ngModel)]="form.subject" />

          <label for="message">Съобщение</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            [(ngModel)]="form.message"
            required
            minlength="5"
          ></textarea>

          <button type="submit" [disabled]="f.invalid">Изпрати</button>
        </form>
      </div>
    </section>
  `,
  styles: [
    `
      .team .contact-lines {
        margin-top: 0.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        font-size: 0.9rem;
        color: var(--ink-soft);
      }

      .form-wrap {
        max-width: 680px;
      }

      .form {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        margin-top: 1rem;
      }

      .form .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      @media (max-width: 620px) {
        .form .row {
          grid-template-columns: 1fr;
        }
      }

      button[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,
  ],
})
export class ContactsComponent {
  private readonly api = inject(ApiService);

  readonly team = signal<TeamMember[]>([]);
  readonly teamLoading = signal(true);

  form: ContactForm = { name: '', email: '', subject: '', message: '' };

  constructor() {
    this.api.team().subscribe({
      next: (rows) => {
        this.team.set(rows);
        this.teamLoading.set(false);
      },
      error: () => this.teamLoading.set(false),
    });
  }

  sendMail(): void {
    const subject = this.form.subject?.trim() || 'Запитване от сайта';
    const body =
      `Име: ${this.form.name}\n` +
      `Имейл: ${this.form.email}\n\n` +
      `${this.form.message}`;
    const href =
      `mailto:${AGENCY_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }
}
