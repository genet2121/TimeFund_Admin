import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CrudService } from '../../../core/services/crud.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HelperService } from '../../../core/services/helper.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dynamic-dialog-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './dynamic-dialog-form.component.html',
  styleUrl: './dynamic-dialog-form.component.css'
})
export class DynamicDialogFormComponent {
  userGroupCreateForm: FormGroup;
  user_group_id!: number;
  isViewDetail: boolean = false;
  endpoint!: string;
  patchEndpoint:string = '';
  title!: string;
  buttonText!: string;
  categoryTypeKey!: string;
  categoryDescriptionKey!: string;
  business_category_id!:number;
  category_id!:number;


  constructor(
    public dialogRef: MatDialogRef<DynamicDialogFormComponent>,
    private crudService: CrudService<any>,
    private fb: FormBuilder,
    private helperService: HelperService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number;
      view: boolean;
      endpoint: string;
      title: string;
      buttonText: string;
      categoryTypeKey: string;
      categoryDescriptionKey: string;
      patchEndpoint:string;
      business_category_id:number;
      category_id:number;

    }
  ) {
    this.user_group_id = data.id;
    this.isViewDetail = data.view;
    this.title = data.title;
    this.buttonText = data.buttonText;
    this.endpoint = data.endpoint;
    this.patchEndpoint = data.patchEndpoint;
    this.business_category_id = data.business_category_id;
    this.category_id = data.category_id;


    this.categoryTypeKey = data.categoryTypeKey;
    this.categoryDescriptionKey = data.categoryDescriptionKey;


    this.userGroupCreateForm = this.fb.group({
      [this.categoryTypeKey]: ['', Validators.required],
      [this.categoryDescriptionKey]: ['', Validators.required],
      is_active: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.user_group_id) {
      this.crudService.getById(this.patchEndpoint, this.user_group_id).subscribe((res) => {
        this.userGroupCreateForm.patchValue({
          [this.categoryTypeKey]: res[this.categoryTypeKey],
          [this.categoryDescriptionKey]: res[this.categoryDescriptionKey],
          is_active: res.is_active,
        });

        // if (this.isViewDetail) {
        //   this.userGroupCreateForm.disable();
        // }
      });
    }
  }

  onSave() {
    if (this.userGroupCreateForm.valid) {
      const payload = this.userGroupCreateForm.value;

      if (this.user_group_id) {
         if(this.category_id){
          const payload = {
            category_id:this.category_id,
            sub_category_type:this.userGroupCreateForm.get([this.categoryTypeKey])?.value,
            sub_category_type_description: this.userGroupCreateForm.get( [this.categoryDescriptionKey])?.value};
            this.crudService.update(`${this.endpoint}`, this.user_group_id, payload).subscribe(
              (response) => this.closeDialog(),
              (error) => console.error('Error updating data', error)
            );
        }else if(this.business_category_id){
          const payload = {
            business_category_id:this.business_category_id,
            business_sub_category_type:this.userGroupCreateForm.get([this.categoryTypeKey])?.value,
            business_sub_category_type_description: this.userGroupCreateForm.get( [this.categoryDescriptionKey])?.value};
            this.crudService.update(`${this.endpoint}`, this.user_group_id, payload).subscribe(
              (response) => this.closeDialog(),
              (error) => console.error('Error updating data', error)
            );
        }
        else{
          this.crudService.update(`${this.endpoint}`, this.user_group_id, payload).subscribe(
            (response) => this.closeDialog(),
            (error) => console.error('Error updating data', error)
          );
        }

      } else
        if(this.business_category_id){
        const payload = {
                        business_category_id:this.business_category_id,
                        business_sub_category_type:this.userGroupCreateForm.get([this.categoryTypeKey])?.value,
                        business_sub_category_type_description: this.userGroupCreateForm.get( [this.categoryDescriptionKey])?.value};
          this.crudService.create(`${this.endpoint}`, payload).subscribe(
              (response) => this.closeDialog(),
              (error) => console.error('Error creating data', error)
            );
        }else
        if(this.category_id){
        const payload = {
                        category_id:this.category_id,
                        sub_category_type:this.userGroupCreateForm.get([this.categoryTypeKey])?.value,
                        sub_category_type_description: this.userGroupCreateForm.get( [this.categoryDescriptionKey])?.value};
          this.crudService.create(`${this.endpoint}`, payload).subscribe(
              (response) => this.closeDialog(),
              (error) => console.error('Error creating data', error)
            );
        }
        else{
        this.crudService.create(`${this.endpoint}`, payload).subscribe(
          (response) => this.closeDialog(),
          (error) => console.error('Error creating data', error)
        );}
      }
     else {
      console.log('Form is not valid!');
    }
  }
  onSuspend(){
    if(this.crudService&&this.user_group_id){
      this.crudService.suspendItem(`${this.endpoint}`, this.user_group_id).subscribe(res =>{
        this.snackBar.open(`${res.message}!`, 'Close', {
          duration: 3000,
           verticalPosition: 'top'
        });
       window.location.reload();

      })
     }else{
      console.log('error')
     }
  }
  closeDialog(): void {
    this.dialogRef.close();
    window.location.reload();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}









