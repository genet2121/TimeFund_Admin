
import { Component, Input, signal, computed } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HelperService } from '../services/helper.service';
import { CrudService } from '../services/crud.service';



export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  userGroupId!: number;
  SidbarLabel: any[] = [];
  constructor(
    private router: Router,
    private helperService: HelperService,
    private crudService: CrudService<any>
  ) {}

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  menuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
  ]);


  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : 100));
  ngOnInit(): void {
    this.userGroupId = this.helperService.getLogInUser.user_group_id;
    console.log('this.userGroupId', this.userGroupId);
    this.getSidbarLabel(this.userGroupId);
  }
  getSidbarLabel(userGroupId: number) {
    this.crudService.getById('user-group-roles/getUserGroupById', userGroupId).subscribe((res) => {
      console.log('res on sidebar', res);
      this.SidbarLabel = res.role;
      const filteredSidebarLabels = this.SidbarLabel.filter((item) => item.can_view&&item.required_on_menu);

      const newMenuItems = filteredSidebarLabels.map((item: any) => {
        const route = `/${item.page_name.replace(/\s+/g, '-').toLowerCase()}`;
        console.log(route);

        return {
          icon: this.getIconForTable(item.page_name),
          label:  item.page_name,
          route: `/${item.page_name.replace(/\s+/g, '-').toLowerCase()}`,
        };

      });

      this.menuItems.set([
        ...this.menuItems(),
        ...newMenuItems
      ]);
    });
  }

  isRouteActive(baseRoute: string): boolean {
    return this.router.url.startsWith(baseRoute);
  }


  private getIconForTable(tableName: string): string {
    switch (tableName) {
      case 'Administrator':
        return 'person';
      case 'Users':
        return 'groups';
      case 'Fundraisings':
        return 'volunteer_activism';
      case 'fundraiserreports':
        return 'campaign';
      case 'Fundraiser Category':
        return 'account_tree';
      case 'User Groups':
        return 'group_add';
      case 'Project Category':
        return 'account_tree';
      case 'Projects':
        return 'trending_up';
      case 'Withdrawal Requests':
        return 'request_page';

      default:
        return 'dashboard';
    }
  }
}
