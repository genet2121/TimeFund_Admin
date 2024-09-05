import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CrudService } from '../../../core/services/crud.service';

@Component({
  selector: 'app-user-group-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
     MatFormFieldModule, MatInputModule,
     MatSelectModule,
     MatOptionModule,
     MatButtonModule, MatDialogModule],
  templateUrl: './user-group-dialog.component.html',
  styleUrl: './user-group-dialog.component.css'
})
export class UserGroupDialogComponent {
  userGroupCreateForm: FormGroup;
  user_group_id!:number;
  isViewDetail: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<UserGroupDialogComponent>,
    private crudService: CrudService<any>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, view:boolean }
  ) {
    this.user_group_id = data.id;
    this.isViewDetail = data.view
    console.log('this.isViewDetail', this.isViewDetail);

    this.userGroupCreateForm = this.fb.group({
      user_group_name: ['', Validators.required],
      is_active: ['', Validators.required],    });
  }

ngOnInit(): void {
 if(this.user_group_id){
  this.crudService.getById('userGroup', this.user_group_id).subscribe((res) => {
    this.userGroupCreateForm.patchValue({
      user_group_name:res.user_group_name,
      is_active: res.is_active ? 'Active' : 'Inactive',
    })
  })
 }
 if (this.isViewDetail) {
  this.userGroupCreateForm.disable();
}
}


  onSave() {
    if (this.userGroupCreateForm.valid) {
      if (this.user_group_id) {

        this.crudService.update('userGroup/put', this.user_group_id, this.userGroupCreateForm.value).subscribe(
          (response) => {
            this.dialogRef.close();
            window.location.reload();
          },
          (error) => {
            console.error('Error updating admin', error);

          }
        );
      } else {

        this.crudService.create('userGroup/create', this.userGroupCreateForm.value).subscribe(
          (response) => {

            this.dialogRef.close();
            window.location.reload();
          },
          (error) => {
            console.error('Error creating user group', error);

          }
        );
      }
    } else {
      console.log('Form not valid!');

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}




