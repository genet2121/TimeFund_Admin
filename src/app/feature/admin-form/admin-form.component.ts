import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [ MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {
  // fullName = 'Moni Roy';
  // email = 'moni@gmail.com';
  // phoneNumber = '+251-919-111-111';
  // country = 'Ethiopia';
  // city = 'Addis Ababa';
  // role = 'Admin';
  // status = 'Active';
  adminForm: FormGroup;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.adminForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isEditMode = params['mode'] === 'edit';
      console.log('hthrjer', this.isEditMode)
    });
  }
  onSave() {
    if (this.adminForm.valid) {
      console.log('Form Submitted!', this.adminForm.value);
    } else {
      console.log('Form not valid!');
    }
  }

  onEdit() {
    console.log('Edit button clicked');
  }
}
