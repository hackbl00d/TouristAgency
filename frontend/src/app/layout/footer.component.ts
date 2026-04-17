import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="ftr">
      <div class="container ftr__inner">
        <div class="ftr__col">
          <h4>Българска Туристическа Агенция</h4>
          <p>
            Открийте България – планини, море, история и автентична култура.
          </p>
        </div>

        <div class="ftr__col">
          <h4>Навигация</h4>
          <ul>
            <li><a routerLink="/tours">Турове</a></li>
            <li><a routerLink="/sightseeing">Забележителности</a></li>
            <li><a routerLink="/hotels">Хотели</a></li>
            <li><a routerLink="/transportation">Транспорт</a></li>
            <li><a routerLink="/contacts">Контакти</a></li>
          </ul>
        </div>

        <div class="ftr__col">
          <h4>Контакт</h4>
          <p>София, България<br />alex.vesely07&#64;gmail.com</p>
        </div>
      </div>

      <div class="ftr__bar">
        <div class="container ftr__bar-inner">
          <span>© {{ year }} Българска Туристическа Агенция</span>
          <span>Разработка: Александър Весели</span>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .ftr {
        background: var(--bg-alt);
        border-top: 1px solid var(--line);
        margin-top: 3rem;
        color: var(--ink-soft);
      }

      .ftr__inner {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 2rem;
        padding: 3rem 1.5rem 2rem;
      }

      .ftr h4 {
        font-size: 1rem;
        margin-bottom: 0.75rem;
        color: var(--ink);
      }

      .ftr ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .ftr li {
        margin: 0.3rem 0;
      }

      .ftr__bar {
        border-top: 1px solid var(--line);
        padding: 1rem 0;
        font-size: 0.85rem;
      }

      .ftr__bar-inner {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    `,
  ],
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
