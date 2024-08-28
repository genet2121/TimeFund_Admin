import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [ MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {
  fullName = 'Moni Roy';
  email = 'moni@gmail.com';
  phoneNumber = '+251-919-111-111';
  country = 'Ethiopia';
  city = 'Addis Ababa';
  role = 'Admin';
  status = 'Active';
}
