import { Routes } from '@angular/router';
import { Home, Dashboard, EditHero } from './components';



export const routes: Routes = [
    {
        path: 'home',
        title: 'Home',
        component: Home
    },
    {
        path: 'dashboard',
        title: 'Dashboard',
        component: Dashboard
    },
    {
        path: 'edit/:id',
        title: 'Edit',
        component: EditHero
    },
    {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
];
