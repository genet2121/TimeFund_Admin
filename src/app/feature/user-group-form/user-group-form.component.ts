import { data } from 'autoprefixer';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CrudService } from '../../core/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-group-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    NgFor,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-group-form.component.html',
  styleUrl: './user-group-form.component.css',
})
export class UserGroupFormComponent {
  groups: Array<{ user_group_id: number; user_group_name: string }> = [];
  userGroupForm: FormGroup;
  id!: number;
  pages: Array<{ tab_name: string; table_id: number }> = [];
  responseData: any[] = [];
 pageNames = [
    { name: 'Admin' },
    { name: 'Blog' },
    { name: 'Dashboard' },
    { name: 'Fundraiser Category' },

  ];
  constructor(
    private crudService: CrudService<any>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userGroupForm = this.fb.group({
      user_group_id: [''],
      permissions: this.fb.array([]),

    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
     this.crudService.getById('user-group-roles/getUserGroupById',this.id).subscribe((res)=>{

      this.responseData = res.role;
      console.log('res', this.responseData);
      this.patchFormValues(this.responseData);
     })
    this.crudService
      .getAll('userGroup/getAllUserGroups')
      .subscribe((res: any) => {
        this.groups = res.data;
      });

  }

  get permissionsArray(): FormArray {
    return this.userGroupForm.get('permissions') as FormArray;
  }

  getTableName(table_id: number): string {
    const table = this.pages.find((page) => page.table_id === table_id);
    return table ? table.tab_name : 'Unknown';
  }

  patchFormValues(roles: any[]): void {
    const permissionArray = this.permissionsArray;
    permissionArray.clear();

    roles.forEach((role) => {
      console.log(role);

      const permissionGroup = this.fb.group({
        page_name: [role.page_name || 'Unknown', Validators.required],
        can_view: [role.can_view],
        can_add: [role.can_add],
        can_view_detail: [role.can_view_detail],
        can_edit: [role.can_edit],
        can_delete: [role.can_delete],
      });

      permissionArray.push(permissionGroup);
    });
  }


  onSubmit() {
    if (this.userGroupForm.valid) {
      const formData = this.userGroupForm.value;

      if (this.id) {
        this.crudService
          .update('userGroup/putUserGroup', this.id, formData)
          .subscribe(
            (response) => {
              console.log('Permissions updated successfully:', response);
              this.snackBar.open('user group Permissions updated successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
              });
              this.router.navigate(['/user_groups']);
            },
            (error) => {
              console.error('Error updating user group permissions:', error);
            }
          );
      } else {
        this.crudService
          .post('userGroup/createUserGroup`', formData)
          .subscribe(
            (response) => {
              console.log('Permissions created successfully:', response);
              this.snackBar.open('user group Permissions created successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
              });
              this.router.navigate(['/user_groups']);
            },
            (error) => {
              console.error('Error creating user group permissions:', error);
            }
          );
      }
    } else {
      console.log('Form is not valid');
    }
  }
  onBack() {
    this.router.navigate(['/user-groups']);
  }
}

