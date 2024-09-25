import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';
import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import { MatSnackBar } from '@angular/material/snack-bar';
import user from '../../core/model/user.model';
import { RoleService } from '../../core/services/role.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  _tableName = 'Users';
  val: any[] = [];
  isSearchVisible = false
  tableColumns = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'email', label: 'E-mail' },
    { key: 'country', label: 'Country' },
    { key: 'hasorganization', label: 'Type' },
    { key: 'is_active', label: 'Status' },
  ];
  displayedColumns = this.tableColumns.map((c) => c.key).concat('action');

  allowedActions: tablePermission = {
    add: true,
    edit: true,
    view: true,
    delete: true,
    assign_role: false,
  };
  tableData: user[] = [];

  constructor(
    private router: Router,
    private crudservice: CrudService<any>,
    private snackBar: MatSnackBar,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.fetchData();
    const allowedActions = this.roleService.getPermissionForTable(
      this._tableName
    );
    this.allowedActions.add = allowedActions.can_add;
    this.allowedActions.edit = allowedActions.can_edit;
    this.allowedActions.view = allowedActions.can_view_detail;
    this.allowedActions.delete = allowedActions.can_delete;
  }

  fetchData() {
    this.crudservice.getAll('users/getallusers').subscribe((data: user[]) => {
      this.tableData = this.transformDataForTable(data);
      console.log('thus', this.tableData);
    });
  }
  transformDataForTable(users: user[]): any[] {
    return users.map((userTableData) => {
      let type: string;
      if (userTableData.hasbusiness) {
        type = 'Business';
      } else if (userTableData.hascharity) {
        type = 'Charity';
      } else {
        type = 'Individual';
      }

      return {
        id: userTableData.user_id,
        fullName: userTableData.fullName,
        email:
          userTableData.email.length > 10
            ? userTableData.email.slice(0, 10) + '...'
            : userTableData.email,
        country:
          userTableData.country.length > 10
            ? userTableData.country.slice(0, 10) + '...'
            : userTableData.country,
        hasorganization: type,
        is_active: userTableData.is_active ? 'Active' : 'Suspended',
      };
    });
  }

  handleViewAction(element: any) {
    this.router.navigate(['/users', element.id]);
  }

  handleEditAction(element: any) {
    this.router.navigate(['/users', element.id,], {
      state: { param: true },
    });
  }

  handleDeleteAction(element: any) {
    if (this.crudservice && element.id) {
      this.crudservice
        .deleteItem('admin/deleteadmins', element.id)
        .subscribe((res) => {
          this.val = res as user[];
          this.snackBar.open('admin deleted successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          this.fetchData();
        });
    } else {
      console.log('error');
    }
  }

  changePage(event: any) {
    console.log('Page changed:', event);
  }

  currentPage = 2;

  handleAddClick() {
    window.location.href = `/users/create`;
  }

  handleSearchClick() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  handleSettingsClick() {
    console.log('Settings button clicked');
  }
}
