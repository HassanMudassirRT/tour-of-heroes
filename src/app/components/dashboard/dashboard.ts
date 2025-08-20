import { Component, inject, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Heroes } from '../../services/heroes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  heroService = inject(Heroes);
  router = inject(Router);
  topHeroes = computed(() =>
    this.heroService
      .heroes()
      .sort((popA, popB) => popB.popularity - popA.popularity)
      .slice(0, 5)
  );
  findHero = signal('');

  searchHero() {}
}
