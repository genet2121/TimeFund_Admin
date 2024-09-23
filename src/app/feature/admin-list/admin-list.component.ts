import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';

import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import admin from '../../core/model/admin.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
   val:any[] = [];
  tableColumns = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'E-mail' },
    { key: 'user_group_id', label: 'Role' },
    { key: 'is_active', label: 'Status' },
  ];
  displayedColumns = this.tableColumns.map(c => c.key).concat('action');


  allowedActions: tablePermission = {
    edit: true,
    view: true,
    delete: true,
    assign_role:false
  };
  tableData: admin[] = [];

  constructor(private router: Router, private crudservice: CrudService<any>,  private snackBar: MatSnackBar,) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.crudservice.getAll('admin/getalladmins')
      .subscribe((data: admin[]) => {
        this.tableData = this.transformDataForTable(data);
        console.log('thus', this.tableData)
      });
  }
  // transformDataForTable(admins: admin[]): any[] {
  //   return admins.map((adminTableData) => ({

  //     id: adminTableData.admin_id,
  //     fullName:
  //     adminTableData.fullName,
  //     email: adminTableData.email,
  //     user_group_id: adminTableData.UserGroupRole.user_group_name,
  //     is_active: adminTableData.isActive ? 'Active' : 'InActive',

  //   }));
  // }
  transformDataForTable(admins: admin[]): any[] {
    return admins.map((adminTableData) => {
      return {
        id: adminTableData.admin_id,
        fullName: adminTableData.fullName,
        email: adminTableData.email,
        user_group_id: adminTableData.UserGroupRole
          ? adminTableData.UserGroupRole.user_group_name
          : 'Unknown',
        is_active: adminTableData.isActive ? 'Active' : 'InActive',
      };
    });
  }

  handleViewAction(element: any) {

    this.router.navigate(['/administrator', element.id, 'view'], {
      queryParams: { view: true }
    });
  }

  handleEditAction(element: any) {
    this.router.navigate(['/administrator', element.id, 'edit'], {
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
    window.location.href = `/administrator/create`;
  }

  handleSearchClick() {
    console.log('Search button clicked');
  }

  handleSettingsClick() {
    console.log('Settings button clicked');
  }
}
