import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../core/crud.service';
import { CommonModule } from '@angular/common';
import { data } from 'autoprefixer';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [ MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {
  adminForm: FormGroup;
  isEdit: boolean = false;
  isViewDetail:boolean = false;
  mode!: string
  id!:number
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router:Router, private crudservice:CrudService<any>) {
    this.adminForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.isViewDetail  = this.router.getCurrentNavigation()?.extras.state?.['view'];
    //this.isEdit  = this.router.getCurrentNavigation()?.extras.state?.['edit'];

  }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
       this.id = Number(params.get('id'));
      this.crudservice.getById('admin/getadminbyid', this.id).subscribe(
        (data)=>{
          this.adminForm.patchValue({
            full_name: data.fullName,
            email: data.email,
            phone_number: data.phoneNumber,
            country: data.country,
            city: data.city,
            role: data.user_group_id,
            status: data.isActive ? 'Active' : 'Inactive'
          });
        }
      )
      this.route.queryParamMap.subscribe(params => {
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
     this.crudservice.create('admin/createadmins', this.adminForm.value).subscribe(respose =>{
       console.log('admin create', respose);
     })
     //this.router.navigate(['/admins'])
    } else {
      console.log('Form not valid!');
    }
  }

  onEdit() {
    console.log('Edit button clicked');
  }
}
