import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ProjectComponent } from './project/project.component';
import { ViewprojectComponent } from './viewproject/viewproject.component';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
import { UserGroupFormComponent } from './user-group-form/user-group-form.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { ViewfundraiserComponent } from './viewfundraiser/viewfundraiser.component';
import { GroupComponent } from './group/group.component';
import { WithdrawalRequestComponent } from './withdrawal-request/withdrawal-request.component';
import { ViewwithdrawalrequestComponent } from './viewwithdrawalrequest/viewwithdrawalrequest.component';

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
    component: AdminFormComponent,
  },
  {
    path: 'admin/:id/view',
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
  {
    path: 'fundraisings',
    component: FundraiserComponent,
  },
  {
    path: 'fundraiser/:id',
    component: ViewfundraiserComponent,
  },
  {
    path: 'user_groups',
    component: UserGroupListComponent,
  },
  {
    path: 'user_groups/create',
    component: UserGroupFormComponent,
  },
  {
    path: 'user-groups',
    component: UserGroupListComponent,
  },
  {
    path: 'user_groups/create',
    component: GroupComponent,
  },
  {
    path: 'user_groups/:id/edit',
    component: GroupComponent,
  },
  {
    path: 'user_groups/:id/assign_role',
    component: UserGroupFormComponent,
  },
  {
    path: 'user_groups/:id/edit',
    component: UserGroupFormComponent,
  },
  {
    path: 'user_groups/:id/view',
    component: UserGroupFormComponent,
  },
  {
    path: 'user_groups/:id/view',
    component: GroupComponent,
  },
  {
    path: 'withdrawal-requests',
    component: WithdrawalRequestComponent,
  },
  {
    path: 'withdrawalrequest/:id',
    component: ViewwithdrawalrequestComponent,
  },
  { path: '**', redirectTo: 'dashboard' },
];
