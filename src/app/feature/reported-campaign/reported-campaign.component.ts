import { Component } from '@angular/core';
import { TableComponent } from "../../shared/table/table.component";

@Component({
  selector: 'app-reported-campaign',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './reported-campaign.component.html',
  styleUrl: './reported-campaign.component.css'
})
export class ReportedCampaignComponent {

}
