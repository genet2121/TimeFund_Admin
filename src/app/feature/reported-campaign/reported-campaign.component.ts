import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import { Column } from '../../core/model/tablecolumn.model';
import { RouterModule } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';
import FundraiserReport from '../../core/model/fundraiserreport.model';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-reported-campaign',
  standalone: true,
  imports: [TableComponent, MatProgressBarModule, CommonModule],
  templateUrl: './reported-campaign.component.html',
  styleUrl: './reported-campaign.component.css',
})
export class ReportedCampaignComponent {
  _isLoading = true;
  isSearchVisible = false;
  constructor(
    private crudService: CrudService<any>,
    public router: RouterModule
  ) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.crudService.getAll('FundraiserReport/getallreports').subscribe(
      (result: FundraiserReport[]) => {
        this.tabledata = this.dataTransformer(result);
        this._isLoading = false;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  tabledata: any[] = [];
  tableColumns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'created_at', label: 'Reported Date' },
    { key: 'status', label: 'Status' },
  ];
  permissions: tablePermission = {
    add: false,
    view: true,
    edit: true,
    delete: true,
    assign_role: false,
  };
  viewAction(element: any) {
    window.location.href = `fundraiser-reports/${element.id}`;
  }
  dataTransformer(data: FundraiserReport[]) {
    return data.map((report) => {
      return {
        id: report.fundraiserReport_id,
        name: report.fullName,
        created_at: new Date(report.createdAt).toLocaleDateString(),
        status: report.status.toUpperCase(),
      };
    });
  }
  handleSearchClick() {
    this.isSearchVisible = !this.isSearchVisible;
  }

}
