import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoles: any;

  constructor(private router: Router) {
    const storedRoles = localStorage.getItem('userRoles');
    this.userRoles = storedRoles ? JSON.parse(storedRoles) : null;

  }

  getPermissions() {
    return this.userRoles || [];
  }
  isAuthorized(pageName: string, action: string): boolean {
    if (!this.userRoles) return false;

    const role = this.userRoles.find((r: any) => r.page_name === pageName);
    if (role) {
        return role[action] === true;
    }
    return false;
}

}
