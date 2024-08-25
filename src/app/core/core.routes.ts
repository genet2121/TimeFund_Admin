
import { Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';

export const coreRoutes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    loadChildren: () => import('../feature/feature.routes').then(m => m.featureRoutes)
  }
];
