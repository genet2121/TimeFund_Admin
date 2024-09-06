
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  adminForm: FormGroup;
  isEdit: boolean = false;
  isViewDetail: boolean = false;
  mode!: string;
  id!: number;
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private crudservice: CrudService<any>,
    private snackBar: MatSnackBar,
  ) {
    this.adminForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      user_group_id: ['', Validators.required],
      status: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.isViewDetail = this.router.getCurrentNavigation()?.extras.state?.['view'];
    //this.isEdit  = this.router.getCurrentNavigation()?.extras.state?.['edit'];
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.crudservice.getById('admin/getadminbyid', this.id).subscribe((data) => {
        this.adminForm.patchValue({
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          country: data.country,
          city: data.city,
          user_group_id: data.user_group_id,
          status: data.isActive ? 'Active' : 'Inactive',
        });
      });


      this.crudservice.getAll('userGroup/getAllUserGroups').subscribe((res: any) => {
        this.roles = res.data;
        console.log('user group data', this.roles);
      });

      this.route.queryParamMap.subscribe((params) => {
        this.isViewDetail = params.get('view') === 'true';
        this.isEdit = params.get('edit') === 'true';
        if (this.isViewDetail) {
          this.adminForm.disable();
        }
      });
    });
  }

  onSave() {
    if (this.adminForm.valid) {
      if (this.id) {

        this.crudservice.update('admin/editadmins', this.id, this.adminForm.value).subscribe(
          (response) => {
            console.log('Admin updated', response);
            this.snackBar.open('Admin updated successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
            this.router.navigate(['/admins']);
          },
          (error) => {
            console.error('Error updating admin', error);
            this.snackBar.open('Failed to update admin.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          }
        );
      } else {

        this.crudservice.create('admin/createadmins', this.adminForm.value).subscribe(
          (response) => {
            console.log('Admin created', response);
            this.adminForm.reset()
            this.snackBar.open('Admin created successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
            this.router.navigate(['/admins']);
          },
          (error) => {
            console.error('Error creating admin', error);
            this.snackBar.open('Failed to create admin.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
            });
          }
        );
      }
    } else {
      console.log('Form not valid!');
      this.snackBar.open('Please fill all required fields correctly.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
    }
  }


  onEdit() {
    console.log('Edit button clicked');
  }
}
