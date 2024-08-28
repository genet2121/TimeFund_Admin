import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {
  constructor( public router: Router) {}

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

  tableData = [
    { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'facilitator', status: 'active' },
    { id: 2, name: 'Bob Williams', email: 'bob.williams@example.com', role: 'admin', status: 'active' },
  ];

  handleAction(element: any) {
    console.log('Action performed on:', element.id);
    // this.router.navigate([/admin/view/${element.id}]);
    window.location.href = `/admin/view/${element.id}`
  }

  changePage(event: any) {

    console.log('Page changed:', event);
  }

  currentPage = 2;
  handleAddClick() {

    console.log('Add button clicked');
  }

  handleSearchClick() {

    console.log('Search button clicked');
  }

  handleSettingsClick() {

    console.log('Settings button clicked');
  }
}
