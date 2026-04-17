import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="container hero__inner">
        <p class="eyebrow">Вътрешен туризъм · България</p>
        <h1>Откриваме истинската България.</h1>
        <p class="lede">
          Планински върхове, средновековни крепости, морски градове и
          възрожденски улици – събрани в грижливо подбрани пътувания за
          любопитни и непретенциозни пътешественици.
        </p>
        <div class="cta">
          <a routerLink="/tours" class="btn">Разгледай турове</a>
          <a routerLink="/contacts" class="btn ghost">Свържи се с нас</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="eyebrow">Нашата мисия</p>
        <h2>Пътуване с уважение към мястото и хората.</h2>
        <p class="lede">
          Вярваме, че най-добрите спомени идват от автентичните срещи – с
          местни хора, с кухнята, с тишината на планината. Работим с малки
          групи, партнираме си с семейни хотели и подбираме маршрутите така,
          че да усетите България, а не просто да я видите.
        </p>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <p class="eyebrow">Краткосрочни цели</p>
        <h2>Към какво се стремим през следващата година.</h2>
        <div class="goals">
          <article class="goal">
            <span class="goal__num">01</span>
            <h3>Разширяване на маршрутите</h3>
            <p>
              Нови турове в Родопите и Странджа с фокус върху местните
              традиции и гастрономия.
            </p>
          </article>
          <article class="goal">
            <span class="goal__num">02</span>
            <h3>Партньорски хотели</h3>
            <p>
              Разширяване на мрежата с още 10 семейни хотела в малките
              градове на страната.
            </p>
          </article>
          <article class="goal">
            <span class="goal__num">03</span>
            <h3>Устойчив туризъм</h3>
            <p>
              По-малко автобуси, повече пешеходни и велосипедни участъци,
              поддръжка на местни производители.
            </p>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        background: var(--surface);
        border-bottom: 1px solid var(--line);
      }

      .hero__inner {
        padding: 5rem 1.5rem 4rem;
        max-width: 780px;
      }

      .cta {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        margin-top: 1.5rem;
      }

      .goals {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 2rem;
        margin-top: 1.5rem;
      }

      .goal__num {
        display: inline-block;
        font-family: 'Cormorant Garamond', serif;
        font-size: 2rem;
        color: var(--accent);
        margin-bottom: 0.5rem;
      }
    `,
  ],
})
export class HomeComponent {}
