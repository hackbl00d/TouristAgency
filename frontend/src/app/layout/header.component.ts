import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="hdr">
      <div class="container hdr__inner">
        <a routerLink="/" class="brand">
          <span class="brand__mark">Б</span>
          <span class="brand__text">
            Българска<br />Туристическа Агенция
          </span>
        </a>

        <button
          class="burger ghost"
          (click)="open.set(!open())"
          [attr.aria-expanded]="open()"
        >
          Меню
        </button>

        <nav class="nav" [class.nav--open]="open()">
          <a
            routerLink="/"
            routerLinkActive="is-active"
            [routerLinkActiveOptions]="{ exact: true }"
            (click)="open.set(false)"
          >
            Начало
          </a>
          <a
            routerLink="/tours"
            routerLinkActive="is-active"
            (click)="open.set(false)"
          >
            Турове
          </a>
          <a
            routerLink="/sightseeing"
            routerLinkActive="is-active"
            (click)="open.set(false)"
          >
            Забележителности
          </a>
          <a
            routerLink="/hotels"
            routerLinkActive="is-active"
            (click)="open.set(false)"
          >
            Хотели
          </a>
          <a
            routerLink="/transportation"
            routerLinkActive="is-active"
            (click)="open.set(false)"
          >
            Транспорт
          </a>
          <a
            routerLink="/contacts"
            routerLinkActive="is-active"
            (click)="open.set(false)"
          >
            Контакти
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      .hdr {
        background: var(--surface);
        border-bottom: 1px solid var(--line);
        position: sticky;
        top: 0;
        z-index: 50;
      }

      .hdr__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        gap: 1rem;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--ink);
      }

      .brand__mark {
        display: grid;
        place-items: center;
        width: 2.25rem;
        height: 2.25rem;
        background: var(--accent);
        color: var(--bg);
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.4rem;
        border-radius: 2px;
      }

      .brand__text {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1rem;
        line-height: 1.15;
        letter-spacing: 0.02em;
      }

      .nav {
        display: flex;
        gap: 1.75rem;
        align-items: center;
      }

      .nav a {
        color: var(--ink-soft);
        font-size: 0.95rem;
      }

      .nav a:hover,
      .nav a.is-active {
        color: var(--ink);
      }

      .nav a.is-active {
        border-bottom: 1px solid var(--accent);
      }

      .burger {
        display: none;
      }

      @media (max-width: 820px) {
        .burger {
          display: inline-block;
        }

        .nav {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          flex-direction: column;
          gap: 0;
          background: var(--surface);
          border-bottom: 1px solid var(--line);
          padding: 0.5rem 0;
        }

        .nav--open {
          display: flex;
        }

        .nav a {
          padding: 0.75rem 1.5rem;
        }

        .nav a.is-active {
          border-bottom: none;
          background: var(--bg-alt);
        }
      }
    `,
  ],
})
export class HeaderComponent {
  readonly open = signal(false);
}
