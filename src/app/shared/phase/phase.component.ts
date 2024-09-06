import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CrudService } from '../../core/services/crud.service';

@Component({
  selector: 'app-phase',
  standalone: true,
  imports: [NgbAccordionModule, MatIconModule],
  templateUrl: './phase.component.html',
  styleUrl: './phase.component.css',
})
export class PhaseComponent {
  constructor(private crudService:CrudService<any>){}
  @Input() projectId: string = '';
  // fetchPhases(){
  //   this.crudService.getAll(`/`)
  // }
}
