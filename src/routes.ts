import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./photos/pages/photos/photos.component').then(m => m.PhotosComponent)
  },
  {
    path: 'photos/:id',
    loadComponent: () => import('./photos/pages/photo-details/photo-details.component').then(m => m.PhotoDetailsComponent)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./photos/pages/photo-favorites/photo-favorites.component').then(m => m.PhotoFavoritesComponent)
  },
];
