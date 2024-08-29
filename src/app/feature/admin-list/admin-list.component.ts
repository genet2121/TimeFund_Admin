import { Component, Inject } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { CrudService } from '../../core/crud.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [TableComponent, RouterModule, CommonModule],
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {
  constructor(private router: Router) {
    console.log(this.router);
  }

  tableColumns = [
    { key: 'name', label: 'Full Name' },
    { key: 'email', label: 'E-mail' },
    { key: 'role', label: 'Roles' },
    { key: 'status', label: 'Status' },
  ];

  allowedActions: tablePermission = {
    edit: true,
    view: true,
    delete: true,
  };
  // tableData: any[] = [];

  // ngOnInit() {
  //   this.fetchData();
  // }

  // fetchData() {
  //   this.crudService.getAll('admin/getalladmins')
  //     .subscribe({
  //       next: (data: any[]) => {
  //         this.tableData = data;
  //       },
  //       error: (err) => {
  //         console.error('Error fetching data', err);
  //       }
  //     });
  // }
  tableData = [
    { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'facilitator', status: 'active' },
    { id: 2, name: 'Bob Williams', email: 'bob.williams@example.com', role: 'admin', status: 'active' },
  ];

  handleViewAction(element: any) {
    window.location.href = `/admin/view/${element.id}`
  }

  handleEditAction(element: any) {

    this.router.navigate(['/admin/edit', element.id], { queryParams: { mode: 'edit' } });

  }
  handleDeleteAction(element: any) {
    console.log('Action performed on:', element.id);

  }
  changePage(event: any) {

    console.log('Page changed:', event);
  }

  currentPage = 2;
  handleAddClick() {

    window.location.href = `/admin/create`
  }

  handleSearchClick() {

    console.log('Search button clicked');
  }

  handleSettingsClick() {

    console.log('Settings button clicked');
  }
}
