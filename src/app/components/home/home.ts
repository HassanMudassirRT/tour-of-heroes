import { Component, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Heroes } from '../../services/heroes';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  heroService = inject(Heroes);
  router = inject(Router);
  heroName = signal('');

  async addHero() {
    const newHeroName = this.heroName();
    if (newHeroName) {
      await this.heroService.addHero(newHeroName);
    }
  }
}
