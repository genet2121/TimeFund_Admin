import { Component, Inject } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import admin from '../../core/model/admin.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assignfacilitator',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatButton,
  ],
  templateUrl: './assignfacilitator.component.html',
  styleUrl: './assignfacilitator.component.css',
})
export class AssignfacilitatorComponent {
  adminList: undefined | admin[] = undefined;
  facilitatorId: string = '';
  isLoading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudservice: CrudService<any>
  ) {}
  ngOnInit() {
    console.log(this.data);
    this.fetchData();
  }
  fetchData() {
    this.crudservice.getAll('admin/getalladmins').subscribe((data: admin[]) => {
      this.adminList = data;
    });
  }

  assingFacilitator() {
    this.isLoading = true;
    this.crudservice
      .update('fundraising/assignfacilitator', this.data.fundraisingId, {
        facilitator_id: this.facilitatorId,
      })
      .subscribe(
        (result) => {
          window.location.reload();
        },
        (error) => {
          this.isLoading = false;
          alert("Failed to assign facilitator");
        }
      );
  }
}
