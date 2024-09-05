import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-phase',
  standalone: true,
  imports: [NgbAccordionModule],
  templateUrl: './phase.component.html',
  styleUrl: './phase.component.css',
})
export class PhaseComponent {}
