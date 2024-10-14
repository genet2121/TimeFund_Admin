import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SidebarComponent,
    MatMenuModule,
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css',
})
export class WorkspaceComponent {
  constructor(private helperService: HelperService) {}
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '64px' : '250px'));
  userName: string = '';
  ngOnInit() {
    if (!this.helperService.isUserLoggedIn()) {
      window.location.replace('/auth/login');
    }
    this.userName = this.helperService.getLogInUser.fullName;
  }
  logoutHandler() {
    this.helperService.logoutUser();
  }
}
