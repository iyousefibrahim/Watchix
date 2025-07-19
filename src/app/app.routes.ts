import { Routes } from '@angular/router';
import { mediaDetailsMatcher } from './shared/utils/mediaDetailsMatcher';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadComponent: () => import('./components/home/home.component').then(h => h.HomeComponent) },
            { matcher: mediaDetailsMatcher, loadComponent: () => import('./components/media-details/media-details.component').then(md => md.MediaDetailsComponent) },
            { path: 'tv/:id/season/:seasonNumber', loadComponent: () => import('./components/season-episodes/season-episodes.component').then(se => se.SeasonEpisodesComponent) },
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found.component').then(nf => nf.NotFoundComponent)
    }
];
