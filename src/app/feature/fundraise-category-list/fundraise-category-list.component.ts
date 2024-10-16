import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';
import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import fundraiseCategory from '../../core/model/fundraiseCategory.model';
import { HelperService } from '../../core/services/helper.service';
import { DynamicDialogFormComponent } from '../../shared/dialog/dynamic-dialog-form/dynamic-dialog-form.component';
import { RoleService } from '../../core/services/role.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import api from '../../core/model/api.model';

@Component({
  selector: 'app-fundraise-category-list',
  standalone: true,
  imports: [
    TableComponent,
    DynamicDialogFormComponent,
    MatProgressBarModule,
    CommonModule,
  ],
  templateUrl: './fundraise-category-list.component.html',
  styleUrl: './fundraise-category-list.component.css',
})
export class FundraiseCategoryListComponent {
  _isLoading = true;
  _tableName = 'Fundraiser Category';
  total: number = 0;
  currentPage = 0;
  val: any[] = [];
  tableColumns = [
    { key: 'category_type', label: 'Category Name' },
    { key: 'category_type_description', label: 'Description' },
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
  loggedInUser: any;
  isSearchVisible = false;

  constructor(
    private router: Router,
    private crudservice: CrudService<any>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private helperService: HelperService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.loggedInUser = this.helperService.getLogInUser;
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
      .getAll(`categories/getallcategory?page=${this.currentPage + 1}`)
      .subscribe((data: any) => {
        const fetchData = data as api<fundraiseCategory>;
        this.tableData = this.transformDataForTable(fetchData.data);
        this.total = fetchData.total;
        this._isLoading = false;
      });
  }
  transformDataForTable(fundraiseCategories: fundraiseCategory[]): any[] {
    return fundraiseCategories.map((fundraiseCategoryTableData) => ({
      id: fundraiseCategoryTableData.category_id,
      category_type: fundraiseCategoryTableData.category_type,
      category_type_description:
        fundraiseCategoryTableData.category_type_description.length > 30
          ? fundraiseCategoryTableData.category_type_description.slice(0, 30) +
            '...'
          : fundraiseCategoryTableData.category_type_description,
      is_active: fundraiseCategoryTableData.is_active ? 'Active' : 'inActive',
    }));
  }
  handleViewAction(element: any) {
    this.router.navigate(['/fundraiser-category', element.id]);
  }
  handleEditAction(element: any) {
    const dialogRef = this.dialog.open(DynamicDialogFormComponent, {
      width: '700px',
      data: {
        id: element.id,
        view: false,
        endpoint: `categories/updatecategory`,
        title: 'Edit Fundraise Category',
        buttonText: 'Update Category',
        categoryTypeKey: 'category_type',
        categoryDescriptionKey: 'category_type_description',
        patchEndpoint: 'categories/getcategorybyid',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed, perform action with result:', result);
      }
    });
  }
  handleAssignRoleAction(element: any) {
    this.router.navigate(['/user_groups', element.id, 'assign_role'], {
      state: { edit: true },
    });
  }

  handleDeleteAction(element: any) {
    this.crudservice
      .deleteItem('categories/removecategory', element.id)
      .subscribe(
        (res) => {
          this.snackBar.open(`Category deleted successfully!`, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
  }
  changePage(event: any) {
    this.currentPage = event.pageIndex;
    this.fetchData();
  }

  handleAddClick() {
    const dialogRef = this.dialog.open(DynamicDialogFormComponent, {
      width: '700px',
      data: {
        endpoint: `categories/createcategory/${this.loggedInUser.admin_id}`,
        id: null,
        view: false,
        title: 'Add Fundraise Category',
        buttonText: 'Add Category',
        categoryTypeKey: 'category_type',
        categoryDescriptionKey: 'category_type_description',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed, perform action with result:', result);
      }
    });
  }
  handleSearchClick() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  handleSettingsClick() {
    console.log('Settings button clicked');
  }
}
