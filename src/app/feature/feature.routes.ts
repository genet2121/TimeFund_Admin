import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ProjectComponent } from './project/project.component';
import { ViewprojectComponent } from './viewproject/viewproject.component';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
import { UserGroupFormComponent } from './user-group-form/user-group-form.component';
import { GroupComponent } from './group/group.component';
import { ProjectCategoryListComponent } from './project-category-list/project-category-list.component';
import { FundraiseCategoryListComponent } from './fundraise-category-list/fundraise-category-list.component';
import { FundraiseCategoryDetailComponent } from './fundraise-category-detail/fundraise-category-detail.component';
import { ProjectCategoryDetailComponent } from './project-category-detail/project-category-detail.component';

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
    path: 'administrator',
    component: AdminListComponent,
  },
  {
    path: 'admin/create',
    component: AdminFormComponent,
  },
  {
    path: 'admin/:id/edit',
    component:AdminFormComponent
  },
  {
    path: 'admin/:id/view',
    component:AdminFormComponent
  },

  {
    path: 'projects',
    component: ProjectComponent,
  },
  {
    path: 'project/:id',
    component: ViewprojectComponent,
  },
  {
    path: 'user-groups',
    component:UserGroupListComponent
  },
  {
    path: 'user_groups/create',
    component: GroupComponent
  },
  {
    path: 'user_groups/:id/edit',
    component:GroupComponent
  },
  {
    path: 'user_groups/:id/assign_role',
    component: UserGroupFormComponent
  },
  {
    path: 'project-category',
    component: ProjectCategoryListComponent
  },
  {
    path: 'project-category/:id/view',
    component: ProjectCategoryDetailComponent
  },
  {
    path: 'project-category/:id/edit',
    component: ProjectCategoryDetailComponent
  },
  {
   path: 'fundraiser-category',
   component: FundraiseCategoryListComponent
  },

    {
      path: 'fundraiser-category/:id/view',
      component:FundraiseCategoryDetailComponent
    },
    {
    path: 'user_groups/:id/view',
    component: GroupComponent
  },
  { path: '**', redirectTo: 'dashboard' },
];
