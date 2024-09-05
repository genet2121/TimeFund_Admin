
import { Component, Input, signal, computed } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HelperService } from '../services/helper.service';
import { CrudService } from '../services/crud.service';
import { PermissionItem, PermissionsResponse } from '../model/permission.model';
import { table } from '../model/sidebarLable.model';


export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};
const tablenames: table[] = [
  {
table_name: "Fundraisers",
table_id:42
},
{
table_name: "Admins",
table_id:3
},
{
table_name: "Users",
table_id:58
},
{
table_name: "Reported Campaigns",
table_id:10
},
{
table_name: "Project Category",
table_id:23
},
{
table_name: "Fundraiser Category",
table_id:26
},
{
table_name: "User groups",
table_id:19
},
]
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
   userGroupId!:number;
   SidbarLabel: any[] = [];
  constructor(
    private router: Router,
    private helperService: HelperService,
    private crudService: CrudService<any>) {}

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  menuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'trending_up', label: 'Projects', route: '/projects' },
  ]);
  // menuItems = signal<MenuItem[]>([
  //   { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
  //   { icon: 'trending_up', label: 'Projects', route: '/projects' },
  //   { icon: 'person', label: 'Admins', route: '/admins' },
  //   { icon: 'groups', label: 'Users', route: '/users' },
  //   { icon: 'volunteer_activism', label: 'Fundraisers', route: '/fundraisers' },
  //   { icon: 'campaign', label: 'Reports', route: '/reports' },
  //   { icon: 'home', label: 'Setting', route: '/setting' },
  // ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : 100));
  ngOnInit(): void {
         this.userGroupId = this.helperService.getLogInUser.user_group_id
         console.log('this.userGroupId', this.userGroupId);
         this.getSidbarLabel(this.userGroupId)
  }

  getSidbarLabel(userGroupId: number) {
    this.crudService
      .getAll(`permission/getPermissions?user_group_id=${userGroupId}`)
      .subscribe((res: any) => {
        this.SidbarLabel = res.data as PermissionItem[];
        console.log('this sidbar label', this.SidbarLabel);


        const filteredSidebarLabels = this.SidbarLabel.filter((item: PermissionItem) =>
          tablenames.some((table) => table.table_id === item.tableName.table_id)
        );


        this.menuItems.set([
          ...this.menuItems(),
          ...filteredSidebarLabels.map((item: PermissionItem) => {
            const table = tablenames.find((table) => table.table_id === item.tableName.table_id);
            return {
              icon: this.getIconForTable(item.tableName.tab_name),
              label: table ? table.table_name : item.tableName.tab_name,
              route: `/${item.tableName.tab_name}`,
            };
          })
        ]);
      });
  }


//   getSidbarLabel(userGroupId:number){
// this.crudService.getAll(`permission/getPermissions?user_group_id=${userGroupId}`).subscribe((res: any) => {
//   this.SidbarLabel = res.data as PermissionItem[];
//   console.log('this sidbar label', this.SidbarLabel);
//   this.menuItems.set([
//     ...this.menuItems(),
//     ...this.SidbarLabel.map((item: PermissionItem) => ({
//       icon: this.getIconForTable(item.tableName.tab_name),
//       label: item.tableName.tab_name,
//       route: `/${item.tableName.tab_name}`,
//     }))])

// })

//   }
  private getIconForTable(tableName: string): string {
    switch (tableName) {
      case 'admins':
        return 'person';
      case 'wegen_users':
        return 'groups';
      case 'wegen_fundraisings':
        return 'volunteer_activism';
      case 'fundraiserreports':
        return 'campaign';
      case 'wegen_category':
        return 'account_tree';
      case 'user_groups':
        return 'group_add';
      case 'wegen_business_category':
        return 'account_tree';


      default:
        return 'dashboard';
    }
  }
}
