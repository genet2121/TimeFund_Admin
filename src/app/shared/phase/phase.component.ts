import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { PhasedetailComponent } from '../phasedetail/phasedetail.component';
import { CommonModule } from '@angular/common';
import { CrudService } from '../../core/services/crud.service';

@Component({
  selector: 'app-phase',
  standalone: true,
  imports: [
    NgbAccordionModule,
    MatIconModule,
    PhasedetailComponent,
    CommonModule,
  ],
  templateUrl: './phase.component.html',
  styleUrl: './phase.component.css',
})
export class PhaseComponent {
  constructor(private crudService: CrudService<any>) {}
  @Input() projectId: string = '';
  @Input() startingDate: string = '';
  @Input() endingDate: string = '';
  @Input() phaseStartingDate: string = '';
  @Input() phaseEndingDate: string = '';
  @Input() phaseTitle: string = '';
  @Input() amount: string = '';
  @Input() actionPlan: string = '';
  @Input() description: string | null = '';
  @Input() phaseProgressExists: boolean = false;
  @Input() phaseProgressImage: string = '';
  @Input() phaseProgressReport: string = '';
  @Input() phaseProgressDescription: string = '';
  @Input() phaseStatus: string = '';
  @Input() phaseId: number = 0;
  navigateTo(dir: string) {
    window.open(dir, '_blank');
  }
  approvePhase() {
    this.crudService
      .update('phase/changephasestatus', this.phaseId, {
        status: 'approved',
      })
      .subscribe(
        (result) => {
          window.location.reload();
        },
        (error) => {
          alert('error');
        }
      );
  }
  denyPhase() {
    this.crudService
      .update('phase/changephasestatus', this.phaseId, {
        status: 'cancelled',
      })
      .subscribe(
        (result) => {
          window.location.reload();
        },
        (error) => {
          alert(error);
        }
      );
  }
}
