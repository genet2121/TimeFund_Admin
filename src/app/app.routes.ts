
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/core.routes').then(m => m.coreRoutes)
  },
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.routes').then(m => m.featureRoutes)
  }
];
