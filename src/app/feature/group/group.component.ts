import { data } from 'autoprefixer';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { groupRoles } from '../../core/model/group-role';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { CrudService } from '../../core/services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Role {
  id: number | null;
  page_name: string;
  can_add: boolean;
  can_edit: boolean;
  can_view: boolean;
  can_delete: boolean;
  can_view_detail: boolean;
  required_on_menu: boolean;
}

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatOptionModule,
  ],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent {
  groupRole: Role[] = groupRoles;
  default_role: (keyof Role)[] = [
    'can_view',
    'can_view_detail',
    'can_add',
    'can_edit',
    'can_delete',
  ];
  isViewDetail: boolean = false;
  selectAllChecked = false;
  role_title = ['View', 'View Detail', 'Add', 'Update', 'Delete'];
  dataForm: FormGroup;
  id!: number;
  responseData: any[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private crudService: CrudService<any>,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.dataForm = this.fb.group({
      group: this.fb.group({
        id: [null],
        user_group_name: ['', [Validators.required]],
        roles: ['', [Validators.required]],
      }),
    });
    this.isViewDetail = this.router.getCurrentNavigation()?.extras.state?.['view'];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      if (this.id !== undefined) {
        this.crudService
          .getById('user-group-roles/getUserGroupById', this.id)
          .subscribe((res: { roles: Role[] }) => {
            if (res.roles && res.roles.length > 0) {
              this.groupRole.forEach((group, index) => {
                this.default_role.forEach((ele) => {
                  (group as any)[ele] = (res.roles[index] as any)[ele] as boolean;
                });
              });
            }
            this.dataForm.get('group')?.patchValue(res);
            this.selectAllChecked = this.groupRole.every(role =>
              this.default_role.every(action => role[action])
            )
          });
          this.route.queryParamMap.subscribe((params) => {
            this.isViewDetail = params.get('view') === 'true';
            console.log('this.isViewDetail', this.isViewDetail);
            if (this.isViewDetail) {
              this.dataForm.disable();
            }
          });
      }
    });


  }

  onChange(index: number, action: keyof Role, value: boolean) {
    let role = this.groupRole[index] as any;
    (role as any)[action] = value as boolean;
    this.dataForm.get('group.roles')?.setValue(this.groupRole);
    this.selectAllChecked = this.groupRole.every(role =>
      this.default_role.every(action => role[action])
    );
  }

  selectAll(value: boolean) {
    this.groupRole.forEach((role) => {
      this.default_role.forEach((action) => {
        if (role[action] !== null) {
          (role as any)[action] = value as boolean;
        }
      });
    });
    this.dataForm.get('group.roles')?.setValue(this.groupRole);
    this.selectAllChecked = value;
  }
  onSubmit() {
    if (this.dataForm.valid) {
      const groupData = this.dataForm.value.group;

      const formattedData = {
        user_group_name: groupData.user_group_name,
        role: groupData.roles,
      };
     if(this.id){
    this.crudService.update('user-group-roles/putUserGroup', this.id, formattedData).subscribe((res)=>{

    })
     }else{
      this.crudService.post('user-group-roles/createUserGroupRole', formattedData)
      .subscribe(
        (response) => {
          console.log('Permissions created successfully:', response);
          this.dataForm.reset();
          this.snackBar.open('User group Permissions created successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.router.navigate(['/user-groups']);
        },
        (error) => {
          console.error('Error creating user group permissions:', error);
        }
      );
     }

    }
  }


}
