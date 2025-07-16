import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: "home", loadComponent: () => import('./components/home/home.component').then(h => h.HomeComponent) },
            { path: "**", loadComponent: () => import('./components/not-found/not-found.component').then(nf => nf.NotFoundComponent) }
        ]
    }

];
