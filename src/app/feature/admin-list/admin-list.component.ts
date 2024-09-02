import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../core/crud.service';

import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import admin from '../../core/model/admin.model';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  tableColumns = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'E-mail' },
    { key: 'user_group_id', label: 'Role' },
    { key: 'isActive', label: 'Status' },
  ];
  displayedColumns = this.tableColumns.map(c => c.key).concat('action');


  allowedActions: tablePermission = {
    edit: true,
    view: true,
    delete: true,
  };
  tableData: admin[] = [];

  constructor(private router: Router, private crudService: CrudService<any>) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.crudService.getAll('admin/getalladmins')
      .subscribe((data: admin[]) => {
        this.tableData = data;
        console.log('thus', this.tableData)
      });
  }

  handleViewAction(element: any) {
    // this.router.navigate(['/admin', element.admin_id, 'view'], {
    //   state: { view: true }
    // });
    this.router.navigate(['/admin', element.admin_id, 'view'], {
      queryParams: { view: true }
    });
  }

  handleEditAction(element: any) {
    this.router.navigate(['/admin', element.admin_id, 'edit'], {
      state: { edit: true }
    });

  }

  handleDeleteAction(element: any) {
    console.log('Action performed on:', element.id);
  }

  changePage(event: any) {
    console.log('Page changed:', event);
  }

  currentPage = 2;

  handleAddClick() {
    window.location.href = `/admin/create`;
  }

  handleSearchClick() {
    console.log('Search button clicked');
  }

  handleSettingsClick() {
    console.log('Settings button clicked');
  }
}
