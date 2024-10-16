import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { Column } from '../../core/model/tablecolumn.model';
import { CrudService } from '../../core/services/crud.service';
import { Fundraising } from '../../core/model/fundraiser.model';
import tablePermission from '../../core/model/tablepermissions.mode';
import { RouterModule } from '@angular/router';
import { RoleService } from '../../core/services/role.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import api from '../../core/model/api.model';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [TableComponent, RouterModule, MatProgressBarModule, CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  _isLoading = true;
  _tableName = 'Projects';
  total: number = 0;
  currentPage = 0;
  tabledata: any[] = [];
  isSearchVisible = false;
  tableColumns: Column[] = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Business Category' },
    { key: 'goal', label: 'Goal' },
    { key: 'closingdate', label: 'Closing date' },
    { key: 'is_active', label: 'Status' },
  ];
  allowedActions: tablePermission = {
    add: false,
    edit: true,
    view: true,
    delete: true,
    assign_role: false,
  };

  constructor(
    private crudService: CrudService<any>,
    public router: RouterModule,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.fetchProjects();
    const allowedActions = this.roleService.getPermissionForTable(
      this._tableName
    );
    this.allowedActions.add = allowedActions.can_add;
    this.allowedActions.edit = allowedActions.can_edit;
    this.allowedActions.view = allowedActions.can_view_detail;
    this.allowedActions.delete = allowedActions.can_delete;
  }

  fetchProjects(): void {
    this._isLoading = true;
    this.crudService
      .getAll(
        `fundraising/getallfundraisings/undefined?page=${this.currentPage + 1}&for_project=true`
      )
      .subscribe(
        (result: any) => {
          const fetchedData = result as api<Fundraising>;
          this.total = fetchedData.total;
          this.tabledata = this.transformData(
            fetchedData.data.filter((project) => project.for_project === true)
          );
          this._isLoading = false;
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      );
  }

  transformData(fundraisings: Fundraising[]): any[] {
    return fundraisings.map((fundraising) => ({
      id: fundraising.fundraising_id,
      title:
        fundraising.title.length > 10
          ? fundraising.title.slice(0, 10) + '...'
          : fundraising.title,
      category:
        fundraising.Wegen_BusinessCategory.business_category_type || 'N/A',
      goal: fundraising.goal,
      closingdate: new Date(fundraising.end_date).toLocaleDateString(),
      is_active: fundraising.is_active ? 'Active' : 'Suspended',
    }));
  }
  viewAction(element: any) {
    window.location.href = `projects/${element.id}`;
  }
  handleSearchClick() {
    this.isSearchVisible = !this.isSearchVisible;
  }
  changePage(event: any) {
    this.currentPage = event.pageIndex;
    this.fetchProjects();
  }
}
