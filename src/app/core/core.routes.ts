import { Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';

export const coreRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('../core/authentication/authentication.routes').then(
        (m) => m.authenticationRoutes
      ),
  },
  {
    path: '',
    component: WorkspaceComponent,
    loadChildren: () =>
      import('../feature/feature.routes').then((m) => m.featureRoutes),
  },
];
