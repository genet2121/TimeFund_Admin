import { Component, inject } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { HelperService } from '../../services/helper.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);
  constructor(
    private crudService: CrudService<any>,
    private helperService: HelperService,
    private router: Router,
    private roleService: RoleService
  ) {}
  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', { duration: 3000, direction: 'ltr' });
  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  getUserRoles(userGroupId: number) {
    this.crudService
      .getById('user-group-roles/getUserGroupById', userGroupId)
      .subscribe((result) => {
        this.roleService.saveRoleList(JSON.stringify(result.role));
      });
  }

  loginHandler(event: any) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('email', this.loginForm?.value.email);
    formData.append('password', this.loginForm?.value.password);
    this.crudService
      .post(`login-admin/login`, {
        email: this.loginForm?.value.email,
        password: this.loginForm?.value.password,
      })
      .subscribe(
        (result) => {
          console.log(result);
          this.helperService.setLogInUser = result;
          this.getUserRoles(result.user_group_id);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // console.log(error);
          this.openSnackBar('Invalid email or password');
        }
      );
  }
}
