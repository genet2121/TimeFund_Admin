import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Fundraising } from '../../core/model/fundraiser.model';
import { Column } from '../../core/model/tablecolumn.model';
import tablePermission from '../../core/model/tablepermissions.mode';
import { CrudService } from '../../core/services/crud.service';
import { TableComponent } from '../../shared/table/table.component';
import { RoleService } from '../../core/services/role.service';

@Component({
  selector: 'app-fundraiser',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.css',
})
export class FundraiserComponent implements OnInit {
  _tableName = 'Fundraisings';
  tabledata: any[] = [];
  tableColumns: Column[] = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Business Category' },
    { key: 'goal', label: 'Goal' },
    { key: 'closingdate', label: 'Closing date' },
    { key: 'status', label: 'Status' },
  ];
  allowedActions: tablePermission = {
    add: true,
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
    this.crudService
      .getAll('fundraising/getallfundraisings/undefined')
      .subscribe(
        (result: Fundraising[]) => {
          this.tabledata = this.transformData(
            result.filter((project) => project.for_project === false)
          );
        },
        (error) => {
          alert(`Error fetching data ${error}`);
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
      category: fundraising.Category.category_type || 'N/A',
      goal: fundraising.goal,
      closingdate: new Date(fundraising.end_date).toLocaleDateString(),
      status: fundraising.is_active ? 'Active' : 'Suspended',
    }));
  }
  viewAction(element: any) {
    window.location.href = `fundraisings/${element.id}`;
  }
}
