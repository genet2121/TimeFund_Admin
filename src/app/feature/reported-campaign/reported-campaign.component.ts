import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import tablePermission from '../../core/model/tablepermissions.mode';
import { Column } from '../../core/model/tablecolumn.model';
import { RouterModule } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';
import FundraiserReport from '../../core/model/fundraiserreport.model';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import api from '../../core/model/api.model';

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
  total: number = 0;
  currentPage = 0;
  constructor(
    private crudService: CrudService<any>,
    public router: RouterModule
  ) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.crudService
      .getAll(`FundraiserReport/getallreports?page=${this.currentPage + 1}`)
      .subscribe(
        (result: any) => {
          const fetchedData = result as api<FundraiserReport>;
          this.tabledata = this.dataTransformer(fetchedData.data);
          this._isLoading = false;
          this.total = fetchedData.total;
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
  changePage(event: any) {
    this.currentPage = event.pageIndex;
    this.fetchProjects();
  }
}
