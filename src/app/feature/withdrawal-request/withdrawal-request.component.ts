import { Component } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { CrudService } from '../../core/services/crud.service';
import { Column } from '../../core/model/tablecolumn.model';
import tablePermission from '../../core/model/tablepermissions.mode';
import withdrawrequstmodel from '../../core/model/withdrawrequest.model';

@Component({
  selector: 'app-withdrawal-request',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './withdrawal-request.component.html',
  styleUrl: './withdrawal-request.component.css',
})
export class WithdrawalRequestComponent {
  tableColumns: Column[] = [
    { key: 'title', label: 'Title' },
    { key: 'fullname', label: 'Organizer Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
  ];
  rowData: any[] = [];
  permissions: tablePermission = {
    view: true,
    edit: true,
    delete: true,
    assign_role: false,
  };
  constructor(private crudService: CrudService<any>) {}
  ngOnInit() {
    this.crudService
      .getAll(`withdraw-requests/withdraw-requests`)
      .subscribe((result) => {
        let data = result;
        this.rowData = this.dataFormater(data);
      });
  }

  dataFormater(data: any) {
    let newData = data as withdrawrequstmodel[];
    let formattedData = newData.map((request) => ({
      id:request.request_id,
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
