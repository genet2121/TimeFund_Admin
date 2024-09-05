import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CrudService } from '../../core/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
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
    MatOptionModule
  ],
  templateUrl: './user-group-form.component.html',
  styleUrl: './user-group-form.component.css'
})
export class UserGroupFormComponent {
  // pages = [
  //   { name: 'Admin' },
  //   { name: 'Blog' },
  //   { name: 'Dashboard' },
  //   { name: 'Fundraiser Category' },


  // ];
  // groups = [
  //   { value: 'group1', name: 'Group 1' },
  //   { value: 'group2', name: 'Group 2' },
  //   { value: 'group3', name: 'Group 3' },

  // ];
  groups: Array<{ user_group_id: number, user_group_name: string }> = [];
  dataForm:FormGroup;
  id!: number;
  pages: Array<{ tab_name: string }> = [];
  constructor(private crudService: CrudService<any>, private fb: FormBuilder,  private route: ActivatedRoute,){
    this.dataForm =this.fb.group({
      user_group_name: [],
      table_id: [],
      can_view: [false],
      can_add: [],
      can_view_detail: [],
      can_update:[],
      can_delete:[]


    })
  }
  ngOnInit(): void {
    this.crudService.getAll('tableName/getAllTable').subscribe(
      (res: any) => {
        this.pages = res.data.map((item: any) => ({
          tab_name: item.tab_name
        }));
      },
      (error) => {
        console.error('Error fetching table names:', error);
      }
    );
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));});
      this.crudService.getAll('userGroup/getAllUserGroups').subscribe((res:any) => {
        this.groups = res.data;
      })
      if(this.id){
        this.crudService
        .getAll(`permission/getPermissions?user_group_id=${this.id}`).subscribe((res:any) =>{
          console.log('ths', res.data);
        })
      }
  }

}
