import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';

import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import admin from '../../core/model/admin.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import userGroup from '../../core/model/userGroup.model';

@Component({
  selector: 'app-user-group-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './user-group-list.component.html',
  styleUrl: './user-group-list.component.css'
})
export class UserGroupListComponent {
  val:any[] = [];
  tableColumns = [
    { key: 'user_group_name', label: 'UserGroup Name' },
    { key: 'is_active', label: 'Status' },
  ];
  displayedColumns = this.tableColumns.map(c => c.key).concat('action');


  allowedActions: tablePermission = {
    edit: true,
    view: true,
    delete: true,
    assign_role: true
  };
  tableData: any[] = [];

  constructor(private router: Router, private crudservice: CrudService<any>,  private snackBar: MatSnackBar,) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.crudservice.getAll('userGroup/getAllUserGroups')
      .subscribe((data:any) => {
        // this.tableData = data.data ;
        this.tableData = this.transformDataForTable(data.data);
        console.log('thus', this.tableData)
      });
  }
  transformDataForTable(userGroups: userGroup[]): any[] {
    return userGroups.map((userGroupTableData) => ({
      id: userGroupTableData.user_group_id,
      user_group_name: userGroupTableData.user_group_name,
      is_active: userGroupTableData.is_active ? 'Active' : 'inActive',
    }));
  }
  handleViewAction(element: any) {

    this.router.navigate(['/user_groups', element.id, 'view'], {
      queryParams: { view: true }
    });
  }

  handleEditAction(element: any) {
    this.router.navigate(['/user_groups', element.id, 'edit'], {
      state: { edit: true }
    });


  }
  handleAssignRoleAction(element:any){
    this.router.navigate(['/user_groups', element.id, 'assign_role'], {
      state: { edit: true }
    });
  }


  handleDeleteAction(element: any) {

   if(this.crudservice&&element.id){
    this.crudservice.deleteItem('admin/deleteadmins', element.id).subscribe(res =>{
      this.val = res as admin[];
      this.snackBar.open('admin deleted successfully!', 'Close', {
        duration: 3000,
         verticalPosition: 'top'
      });
       this.fetchData();

    })
   }else{
    console.log('error')
   }
}

  changePage(event: any) {
    console.log('Page changed:', event);
  }

  currentPage = 2;

  handleAddClick() {
    window.location.href = `user_groups/create`;
  }

  handleSearchClick() {
    console.log('Search button clicked');
  }

  handleSettingsClick() {
    console.log('Settings button clicked');
  }

}




