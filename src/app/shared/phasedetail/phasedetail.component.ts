import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-phasedetail',
  standalone: true,
  imports: [NgbAccordionModule, MatIconModule,CommonModule],
  templateUrl: './phasedetail.component.html',
  styleUrl: './phasedetail.component.css',
})
export class PhasedetailComponent {
  @Input() startingDate: string = '';
  @Input() endingDate: string = '';
  @Input() phaseStartingDate: string = '';
  @Input() phaseEndingDate: string = '';
  @Input() phaseTitle: string = '';
  @Input() amount: string = '';
  @Input() actionPlan: string = '';
  @Input() description: string | null = '';
  viewDocInNewTab(url: string) {
    window.open(url, '_blank');
  }
}
