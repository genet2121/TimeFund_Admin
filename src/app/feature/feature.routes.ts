
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

export const featureRoutes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'dashboard'
  // },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'users',
    component:UsersComponent
  },
  { path: '**', redirectTo: 'dashboard' },

];
