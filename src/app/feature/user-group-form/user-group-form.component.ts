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
    this.crudService.getAll('tableName/getAllTable').subscribe(
      (res: any) => {
        this.pages = res.data.map((item: any) => ({
          table_id: item.table_id,
          tab_name: item.tab_name,
        }));

        this.initializePermissions();
      },
      (error) => {
        console.error('Error fetching table names:', error);
      }
    );

    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });

    this.crudService
      .getAll('userGroup/getAllUserGroups')
      .subscribe((res: any) => {
        this.groups = res.data;
      });

    if (this.id) {
      this.crudService
        .getAll(`permission/getPermissions?user_group_id=${this.id}`)
        .subscribe((res: any) => {
          this.responseData = res.data;
          this.patchFormValues(this.responseData);
        });
    }
  }

  get permissionsArray(): FormArray {
    return this.userGroupForm.get('permissions') as FormArray;
  }

  getTableName(table_id: number): string {
    const table = this.pages.find((page) => page.table_id === table_id);
    return table ? table.tab_name : 'Unknown';
  }

  initializePermissions() {
    this.pages.forEach((page) => {
      const permissionGroup = this.fb.group({
        table_id: [page.table_id],
        can_view: [false],
        can_add: [false],
        can_view_detail: [false],
        can_update: [false],
        can_delete: [false],
      });

      this.permissionsArray.push(permissionGroup);
    });
  }

  patchFormValues(responseData: any) {
    responseData.forEach((permission: any) => {
      const permissionGroup = this.permissionsArray.controls.find(
        (control) => control.get('table_id')?.value === permission.table_id
      );

      if (permissionGroup) {
        permissionGroup.patchValue({
          can_view: permission.can_view,
          can_add: permission.can_add,
          can_view_detail: permission.can_view_detail,
          can_update: permission.can_update,
          can_delete: permission.can_delete,
        });
      }
    });

    if (responseData.length > 0) {
      this.userGroupForm.patchValue({
        user_group_id: responseData[0].user_group_id,
      });
    } else {
      console.error('Invalid responseData structure:', responseData);
    }
  }

  onSubmit() {
    if (this.userGroupForm.valid) {
      const formData = this.userGroupForm.value;

      if (this.responseData && this.responseData.length > 0) {
        this.crudService
          .update('permission/putPermission', this.id, formData)
          .subscribe(
            (response) => {
              console.log('Permissions updated successfully:', response);
              this.snackBar.open('Permissions updated successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
              });
              this.router.navigate(['/user_groups']);
            },
            (error) => {
              console.error('Error updating permissions:', error);
            }
          );
      } else {
        this.crudService
          .post('permission/createPermission', formData)
          .subscribe(
            (response) => {
              console.log('Permissions created successfully:', response);
              this.snackBar.open('Permissions created successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
              });
              this.router.navigate(['/user_groups']);
            },
            (error) => {
              console.error('Error creating permissions:', error);
            }
          );
      }
    } else {
      console.log('Form is not valid');
    }
  }
  onBack() {
    this.router.navigate(['/user_groups']);
  }
}
