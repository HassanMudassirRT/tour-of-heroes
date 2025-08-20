import {
  Component,
  signal,
  input,
  computed,
  Signal,
  inject,
  resource,
  effect,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Heroes } from '../../services/heroes';
import { Hero } from '../../interfaces';

@Component({
  selector: 'app-edit-hero',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-hero.html',
  styleUrl: './edit-hero.css',
})
export class EditHero {
  locationSerice = inject(Location);
  heroService = inject(Heroes);
  id = input.required<number>();

  heroResource = resource({
    params: () => ({ id: this.id() }),
    loader: ({ params }) => this.heroService.getHero(params.id),
  });

  hero: Signal<Hero | undefined> = computed(() => {
    return this.heroResource.value();
  });

  heroName: WritableSignal<string> = signal('');

  constructor() {
    effect(() => {
      const name = this.hero()?.name;
      if (name !== undefined) {
        this.heroName.set(name);
      }
    });
  }

  async updateHero() {
    const currentHero = this.hero();

    if (currentHero) {
      await this.heroService.updateHero({
        ...currentHero,
        name: this.heroName(),
      });
    }
  }
}
