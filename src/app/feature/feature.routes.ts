import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { ProjectComponent } from './project/project.component';
import { ViewprojectComponent } from './viewproject/viewproject.component';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
// import { UserGroupFormComponent } from './user-group-form/user-group-form.component';
import { FundraiserComponent } from './fundraiser/fundraiser.component';
import { ViewfundraiserComponent } from './viewfundraiser/viewfundraiser.component';
import { GroupComponent } from './group/group.component';
import { ProjectCategoryListComponent } from './project-category-list/project-category-list.component';
import { FundraiseCategoryListComponent } from './fundraise-category-list/fundraise-category-list.component';
import { FundraiseCategoryDetailComponent } from './fundraise-category-detail/fundraise-category-detail.component';
import { ProjectCategoryDetailComponent } from './project-category-detail/project-category-detail.component';

import { WithdrawalRequestComponent } from './withdrawal-request/withdrawal-request.component';
import { ViewwithdrawalrequestComponent } from './viewwithdrawalrequest/viewwithdrawalrequest.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReportedCampaignComponent } from './reported-campaign/reported-campaign.component';
import { ViewReportedCampaignComponent } from './view-reported-campaign/view-reported-campaign.component';
import { RoleGuard } from '../core/services/auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
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
    path: 'users/create',
    component: UserFormComponent,
  },
  {
    path: 'users/:id/edit',
    component: UserFormComponent,
  },
  {
    path: 'users/:id/view',
    component: UserFormComponent,
  },
  {
    path: 'administrator',
    component: AdminListComponent,
  },
  {
    path: 'administrator/create',
    component: AdminFormComponent,
  },
  {
    path: 'administrator/:id/edit',
    component: AdminFormComponent,
  },
  // {
  //   path: 'administrator/:id/view',
  //   component: AdminFormComponent,
  // },
  {
    path: 'administrator/:id/view',
    component: AdminFormComponent,
    canActivate: [RoleGuard],
    data: {
        pageName: 'Administrator',
        action: 'can_view'
    }
}
,

  {
    path: 'forbidden',
    component:PagenotfoundComponent
  },
  {
    path: 'projects',
    component: ProjectComponent,
  },
  {
    path: 'projects/:id',
    component: ViewprojectComponent,
  },
  {
    path: 'fundraisings',
    component: FundraiserComponent,
  },
  {
    path: 'fundraisings/:id',
    component: ViewfundraiserComponent,
  },


  {
    path: 'user-groups',
    component: UserGroupListComponent,
  },
  {
    path: 'user-groups/create',
    component: GroupComponent,
  },
  {
    path: 'user-groups/:id/edit',
    component: GroupComponent,
  },



  {
    path: 'project-category',
    component: ProjectCategoryListComponent,
  },
  {
    path: 'project-category/:id/view',
    component: ProjectCategoryDetailComponent,
  },
  {
    path: 'project-category/:id/edit',
    component: ProjectCategoryDetailComponent,
  },
  {
    path: 'fundraiser-category',
    component: FundraiseCategoryListComponent,
  },

    {
      path: 'fundraiser-category/:id/view',
      component:FundraiseCategoryDetailComponent
    },

  {
    path: 'fundraiser-category/:id/view',
    component: FundraiseCategoryDetailComponent,
  },
  {
    path: 'user-groups/:id/view',
    component: GroupComponent,
  },
  {
    path: 'withdrawal-requests',
    component: WithdrawalRequestComponent,
  },
  {
    path: 'withdrawal-requests/:id',
    component: ViewwithdrawalrequestComponent,
  },
  {
    path: 'fundraiser-reports',
    component: ReportedCampaignComponent,
  },
  {
    path: 'fundraiser-reports/:id',
    component: ViewReportedCampaignComponent,
  },
  { path: '**', redirectTo: 'dashboard' },
];
