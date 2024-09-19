import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../../core/services/crud.service';
import FundraiserReport from '../../core/model/fundraiserreport.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-reported-campaign',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './view-reported-campaign.component.html',
  styleUrl: './view-reported-campaign.component.css',
})
export class ViewReportedCampaignComponent {
  fundraiseReport: undefined | FundraiserReport = undefined;
  fundraiserId: number = 0;
  constructor(
    private crudService: CrudService<any>,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((p) => {
      const { id } = p;
      this.fundraiserId = id;
      this.crudService
        .getById(`FundraiserReport/getreportbyid`, id)
        .subscribe((data: any) => {
          this.fundraiseReport = data as FundraiserReport;
        });
    });
  }
  viewDocInNewTab(url: string) {
    window.open(url, '_blank');
  }
  updateStatus() {
    this.crudService
      .update('FundraiserReport/updatefundraiserstatus', this.fundraiserId, {
        status: 'resolved',
      })
      .subscribe(
        (result) => {
          window.location.reload();
        },
        (error) => {
          alert(error.message);
        }
      );
  }
}
