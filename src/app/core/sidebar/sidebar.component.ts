// import { CommonModule } from '@angular/common';
// import { Component, computed, Input, signal } from '@angular/core';
// import {MatListModule} from '@angular/material/list'
// import {MatIconModule} from '@angular/material/icon'
// import { Router, RouterModule } from '@angular/router';
//  export type MenuItem = {
//   icon:string;
//   label:string;
//   route?:string;
//  }
// @Component({
//   selector: 'app-sidebar',
//   standalone: true,
//   imports: [MatListModule, CommonModule, MatIconModule, RouterModule],
//   templateUrl: './sidebar.component.html',
//   styleUrl: './sidebar.component.css'
// })
// export class SidebarComponent {
//   constructor(private router: Router){

//   }
//   sideNavCollapsed = signal(false);
//   @Input() set collapsed(val:boolean){
//     this.sideNavCollapsed.set(val);
//   }
//   menuItems = signal<MenuItem[]>([
//     {
//       icon: 'dashboard',
//       label: 'Dashboard',
//       route: 'dashbard'
//     },
//     {
//       icon: 'person_add',
//       label: 'User',
//       route: 'user'
//     },
//     {
//       icon: 'insert_comment',
//       label: 'Setting',
//       route: 'setting'
//     }

//   ]);
//   profilePicSize = computed(() => this.sideNavCollapsed() ? '32':100);

//   isActive(route?: string): boolean {
//     return route ? this.router.url.includes(route) : false;
//   }

// }
import { Component, Input, signal, computed } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  constructor(private router: Router) {}

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'trending_up', label: 'Projects', route: '/projects' },
    { icon: 'person', label: 'Admins', route: '/admins' },
    { icon: 'groups', label: 'Users', route: '/users' },
    { icon: 'volunteer_activism', label: 'Fundraisers', route: '/fundraisers' },
    { icon: 'campaign', label: 'Reports', route: '/reports' },
    { icon: 'home', label: 'Setting', route: '/setting' },
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : 100));
}
