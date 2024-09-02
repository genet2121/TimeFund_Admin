import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ProjectComponent } from './project/project.component';
import { ViewprojectComponent } from './viewproject/viewproject.component';

export const featureRoutes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'dashboard'
  // },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'admins',
    component: AdminListComponent,
  },
  {
    path: 'admin/create',
    component: AdminFormComponent,
  },
  {
    path: 'admin/edit/:id',
    component: AdminFormComponent,
  },
  {
    path: 'admin/view/:id',
    component: AdminFormComponent,
  },
  {
    path: 'projects',
    component: ProjectComponent,
  },
  {
    path: 'project/:id',
    component: ViewprojectComponent,
  },
  { path: '**', redirectTo: 'dashboard' },
];
