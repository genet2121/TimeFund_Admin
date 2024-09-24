
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRoles: any;

  constructor(private router: Router, private roleService: RoleService) {

    this.userRoles = this.roleService.getUserRoles();
    console.log('User roles from RoleService:', this.userRoles);
  }

  getPermissions() {
    console.log('Returning permissions:', this.userRoles || []);
    return this.userRoles || [];
  }

  isAuthorized(pageName: string, action: string): boolean {
    if (!this.userRoles) {
      console.log('No user roles found, authorization denied');
      return false;
    }

    const role = this.userRoles.find((r: any) => r.page_name === pageName);
    if (role) {
      console.log(`Authorization found for ${pageName}:`, role);
      return role[action] === true;
    }
    console.log(`No matching role found for ${pageName}`);
    return false;
  }
}
