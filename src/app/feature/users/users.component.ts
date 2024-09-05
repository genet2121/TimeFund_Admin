import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  tableColumns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'email', label: 'Email' },
  ];

  allowedActions: tablePermission = {
    edit: true,
    view: true,
    delete: true,
    assign_role:false
  };

  tableData = [
    { name: 'Alice Johnson', age: 28, email: 'alice.johnson@example.com' },
    { name: 'Bob Williams', age: 34, email: 'bob.williams@example.com' },
  ];
  tableData2 = [
    { name: 'Noah Young', age: 29, email: 'noah.young@example.com' },
    { name: 'Olivia King', age: 28, email: 'olivia.king@example.com' },
  ];

  handleAction(element: any) {
    console.log('Action performed on:', element);
  }
  changePage(element: any) {
    this.tableData = this.tableData2;
  }

  currentPage = 2;
}
