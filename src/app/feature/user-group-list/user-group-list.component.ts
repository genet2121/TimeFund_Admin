import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';
import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import { MatSnackBar } from '@angular/material/snack-bar';
import userGroup from '../../core/model/userGroup.model';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from '../../core/services/role.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-user-group-list',
  standalone: true,
  imports: [TableComponent, MatProgressBarModule, CommonModule],
  templateUrl: './user-group-list.component.html',
  styleUrl: './user-group-list.component.css',
})
export class UserGroupListComponent {
  _tableName = 'User Groups';
  _isLoading = true;
  current_page = 0;
  page_size:number = 0;
  val: any[] = [];
  tableColumns = [
    { key: 'user_group_name', label: 'UserGroup Name' },
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
  tableData: any[] = [];
  isSearchVisible = false;

  constructor(
    private router: Router,
    private crudservice: CrudService<any>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
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
    this._isLoading = true;
    this.crudservice
      .getAll(`user-group-roles/getAllUserGroups?page=${this.current_page + 1}`)
      .subscribe((data: any) => {
        this.tableData = this.transformDataForTable(data.data);
        this._isLoading = false;
        this.page_size = data.total;
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
    this.router.navigate(['/user-groups', element.id, 'view'], {
      queryParams: { view: true },
    });
  }

  handleEditAction(element: any) {
    this.router.navigate(['/user-groups', element.id]);
  }
  handleAssignRoleAction(element: any) {
    this.router.navigate(['/user_groups', element.id, 'assign_role'], {
      state: { edit: true },
    });
  }

  handleDeleteAction(element: any) {
    if (this.crudservice && element.id) {
      this.crudservice
        .deleteItem('user-group-roles/deleteUserGroup', element.id)
        .subscribe((res) => {
          this.snackBar.open(`${res.message}!`, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          window.location.reload();
        });
    } else {
      console.log('error');
    }
  }

  changePage($event:any) {
    this.current_page = $event.pageIndex;
    this.fetchData();
  }

  handleAddClick() {
    this.router.navigate(['/user-groups/create']);
  }

  handleSearchClick() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  handleSettingsClick() {
    console.log('Settings button clicked');
  }
}
