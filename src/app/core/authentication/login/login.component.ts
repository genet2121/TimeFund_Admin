import { Component } from '@angular/core';
import { CrudService } from '../../crud.service';
import { HelperService } from '../../helper.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private crudService: CrudService<any>,
    private helperService: HelperService,
    private router: Router
  ) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
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
          this.helperService.setLogInUser = result;
          console.log(result);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
