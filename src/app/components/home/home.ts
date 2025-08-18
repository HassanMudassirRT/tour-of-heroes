import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Heroes } from '../../services/heroes';

@Component({
  selector: 'app-home',
  imports: [],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  heroService = inject(Heroes);
  router = inject(Router)
  heroes = this.heroService.heroes();
}
