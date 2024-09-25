import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';
import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import projectCategory from '../../core/model/projectCategory.model';
import { HelperService } from '../../core/services/helper.service';
import { DynamicDialogFormComponent } from '../../shared/dialog/dynamic-dialog-form/dynamic-dialog-form.component';
import { RoleService } from '../../core/services/role.service';

@Component({
  selector: 'app-project-category-list',
  standalone: true,
  imports: [TableComponent, DynamicDialogFormComponent],
  templateUrl: './project-category-list.component.html',
  styleUrl: './project-category-list.component.css',
})
export class ProjectCategoryListComponent {
  _tableName = 'Project Category';
  val: any[] = [];
  tableColumns = [
    { key: 'business_category_type', label: 'Category Name' },
    { key: 'business_category_type_description', label: 'Description' },
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
  loggedInUser!: any;
  isSearchVisible = false;
  constructor(
    private router: Router,
    private crudservice: CrudService<any>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private helperService: HelperService,
    private roleService:RoleService
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
    this.crudservice
      .getAll('businesscategory/getallbusinesscategory')
      .subscribe((data: any) => {
        this.tableData = this.transformDataForTable(data);
        console.log('thus', this.tableData);
      });
  }
  transformDataForTable(fundraiseCategories: projectCategory[]): any[] {
    return fundraiseCategories.map((fundraiseCategoryTableData) => ({
      id: fundraiseCategoryTableData.business_category_id,
      business_category_type: fundraiseCategoryTableData.business_category_type,
      business_category_type_description:
        fundraiseCategoryTableData.business_category_type_description.length >
        30
          ? fundraiseCategoryTableData.business_category_type_description.slice(
              0,
              30
            ) + '...'
          : fundraiseCategoryTableData.business_category_type_description,

      is_active: fundraiseCategoryTableData.is_active ? 'Active' : 'inActive',
    }));
  }

  handleViewAction(element: any) {
    this.router.navigate(['/project-category', element.id]);
  }

  handleEditAction(element: any) {
    const dialogRef = this.dialog.open(DynamicDialogFormComponent, {
      width: '700px',
      data: {
        id: element.id,
        view: false,
        endpoint: `businesscategory/editbusinesscategory`,
        title: 'Edit Project Category',
        buttonText: 'Update Category',
        categoryTypeKey: 'business_category_type',
        categoryDescriptionKey: 'business_category_type_description',
        patchEndpoint: 'businesscategory/getbusinesscategory',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dialog closed, perform action with result:', result);
      }
    });
  }



  handleDeleteAction(element: any) {
    this.crudservice
      .deleteItem('businesscategory/removebusinesscategory', element.id)
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
    console.log('Page changed:', event);
  }

  currentPage = 2;

  handleAddClick() {
    const dialogRef = this.dialog.open(DynamicDialogFormComponent, {
      width: '700px',
      data: {
        endpoint: `businesscategory/createbusinesscategory/${this.helperService.getLogInUser.admin_id}`,
        id: null,
        view: false,
        title: 'Add Project Category',
        buttonText: 'Add Category',
        categoryTypeKey: 'business_category_type',
        categoryDescriptionKey: 'business_category_type_description',
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














