import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';
import withdrawrequstmodel from '../../core/model/withdrawrequest.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewwithdrawalrequest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewwithdrawalrequest.component.html',
  styleUrl: './viewwithdrawalrequest.component.css',
})
export class ViewwithdrawalrequestComponent {
  constructor(
    private crudService: CrudService<any>,
    private route: ActivatedRoute
  ) {}
  withdrawalRequest: undefined | withdrawrequstmodel = undefined;
  requestId: number = 0;
  ngOnInit() {
    this.route.params.subscribe((p) => {
      const { id } = p;
      this.requestId = id;
      this.crudService
        .getById(`withdraw-requests/withdrawalbyrequestid`, id)
        .subscribe((data: any) => {
          this.withdrawalRequest = data as withdrawrequstmodel;
        });
    });
  }
  updateWithDrawalRequestStatus(status: string) {
    this.crudService
      .update(`withdraw-requests/withdraw/status`, this.requestId, {
        status: status,
      })
      .subscribe(
        (result) => {
          window.location.reload();
        },
        (error) => {
          alert(`error occured: ${error.message}`);
        }
      );
  }
}
