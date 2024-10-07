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
  selector: 'app-contact-message-response',
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
  templateUrl: './contact-message-response.component.html',
  styleUrl: './contact-message-response.component.css'
})
export class ContactMessageResponseComponent {
  contactResponseForm: FormGroup;
  contact_id!: number;
  isViewDetail: boolean = false;
  endpoint!: string;
  patchEndpoint:string = '';
  title!: string;
  buttonText!: string;
  subjectKey!: string;
  responseKey!: string;
  business_category_id!:number;



  constructor(
    public dialogRef: MatDialogRef<ContactMessageResponseComponent>,
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


    }
  ) {
    this.contact_id = data.id;
    this.isViewDetail = data.view;
    this.title = data.title;
    this.buttonText = data.buttonText;
    this.endpoint = data.endpoint;
    this.patchEndpoint = data.patchEndpoint;
    this.business_category_id = data.business_category_id;



    this.subjectKey = data.categoryTypeKey;
    this.responseKey = data.categoryDescriptionKey;


    this.contactResponseForm = this.fb.group({
      [this.subjectKey]: ['', Validators.required],
      [this.responseKey]: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    if (this.contact_id) {
      this.crudService.getById(this.patchEndpoint, this.contact_id).subscribe((res) => {
        this.contactResponseForm.patchValue({
          [this.subjectKey]: res.Response[this.subjectKey],
          [this.responseKey]: res.Response[this.responseKey],

        });

        // if (this.isViewDetail) {
        //   this.userGroupCreateForm.disable();
        // }
      });
    }
  }

  onSave() {
    if (this.contactResponseForm.valid) {

      const payload = {
        admin_id:this.helperService.getLogInUser.admin_id,
        subject:this.contactResponseForm.get([this.subjectKey])?.value,
        response: this.contactResponseForm.get( [this.responseKey])?.value};
        this.crudService.create(`${this.endpoint}`,  payload).subscribe(
          (response) =>

            this.closeDialog(),
          (error) => console.error('Error updating data', error)
        );
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






