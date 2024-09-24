import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const pageName = route.data['pageName'];
    const action = route.data['action'];

    console.log('Page Name:', pageName);
    console.log('Action:', action);

    const hasAccess = this.authService.isAuthorized(pageName, action);
    console.log('Has Access:', hasAccess);

    if (!hasAccess) {
        this.router.navigate(['/forbidden']);
    }
    return hasAccess;
}

}
