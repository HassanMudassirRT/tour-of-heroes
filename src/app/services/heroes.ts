import { Injectable, signal, effect } from '@angular/core';
import { Hero } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class Heroes {
  private _heroes = signal<Hero[]>([]);
  readonly heroes = this._heroes.asReadonly();
  private heroesUrl = 'http://localhost:3000/heroes';

  constructor() {
    effect(
      () => {
        fetch(this.heroesUrl)
          .then((response) => response.json())
          .then((heroes: Hero[]) => this._heroes.set(heroes))
          .catch((error) => console.error('Failed to fetch heroes:', error));
      }
    );
  }

  async getHero(id: number): Promise<Hero | undefined> {
    const response = await fetch(`${this.heroesUrl}/${id}`);
    if (!response.ok) {
      return undefined;
    }
    const hero: Hero = await response.json();
    return hero;
  }

  async updateHero(updatedHero: Hero): Promise<Hero> {
    const response = await fetch(`${this.heroesUrl}/${updatedHero.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedHero),
    });

    if (!response.ok) {
      throw new Error('Failed to update hero');
    }

    const hero: Hero = await response.json();

    this._heroes.update((currentHeroes) => {
      return currentHeroes.map((h) => (h.id === hero.id ? hero : h));
    });

    return hero;
  }

  async addHero(name: string): Promise<Hero> {
    const newId: number = Number(
      (
        this._heroes()
          .sort((a, b) => b.id - a.id)
          .at(0) as Hero
      ).id
    );

    const newHero: Hero = {
      id: newId + 1,
      name,
      popularity: Math.floor(Math.random() * 10) + 1,
    };

    console.log('newHero', newHero);

    const response = await fetch(this.heroesUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHero),
    });

    if (!response.ok) {
      throw new Error('Failed to add hero');
    }

    const hero: Hero = await response.json();

    this._heroes.update((currentHeroes) => {
      return [...currentHeroes, hero];
    });

    return hero;
  }

  async deleteHero(id: number): Promise<Hero> {
    const response = await fetch(`${this.heroesUrl}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete hero');
    }

    const hero: Hero = await response.json();

    this._heroes.update((currentHeroes) => {
      return currentHeroes.filter((h) => h.id !== hero.id);
    });

    return hero;
  }
}
