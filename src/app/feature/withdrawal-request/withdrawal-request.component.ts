import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { CrudService } from '../../core/services/crud.service';
import { Column } from '../../core/model/tablecolumn.model';
import tablePermission from '../../core/model/tablepermissions.mode';
import withdrawrequstmodel from '../../core/model/withdrawrequest.model';
import { RoleService } from '../../core/services/role.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-withdrawal-request',
  standalone: true,
  imports: [TableComponent, MatProgressBarModule, CommonModule],
  templateUrl: './withdrawal-request.component.html',
  styleUrl: './withdrawal-request.component.css',
})
export class WithdrawalRequestComponent {
  _isLoading = true;
  _tableName = 'Withdrawal Requests';
  tableColumns: Column[] = [
    { key: 'title', label: 'Title' },
    { key: 'fullname', label: 'Organizer Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
  ];
  rowData: any[] = [];
  allowedActions: tablePermission = {
    add: true,
    edit: true,
    view: true,
    delete: true,
    assign_role: false,
  };
  constructor(
    private crudService: CrudService<any>,
    private roleService: RoleService
  ) {}
  ngOnInit() {
    this.crudService
      .getAll(`withdraw-requests/withdraw-requests`)
      .subscribe((result) => {
        let data = result;
        this.rowData = this.dataFormater(data);
        this._isLoading = false;
      });
    const allowedActions = this.roleService.getPermissionForTable(
      this._tableName
    );
    this.allowedActions.add = allowedActions.can_add;
    this.allowedActions.edit = allowedActions.can_edit;
    this.allowedActions.view = allowedActions.can_view_detail;
    this.allowedActions.delete = allowedActions.can_delete;
  }

  dataFormater(data: any) {
    let newData = data as withdrawrequstmodel[];
    let formattedData = newData.map((request) => ({
      id: request.request_id,
      title: request.Wegen_Fundraising.title,
      fullname: request.Wegen_User.fullName,
      amount: request.amount,
      status: request.status,
    }));
    return formattedData;
  }

  viewAction(element: any) {
    window.location.href = `withdrawalrequest/${element.id}`;
  }
}
