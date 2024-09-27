import { Component, inject } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Fundraising } from '../../core/model/fundraiser.model';
import { PhaseComponent } from '../../shared/phase/phase.component';
import { NgbAccordionDirective } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
} from '@angular/material/dialog';
import { AssignfacilitatorComponent } from '../../shared/assignfacilitator/assignfacilitator.component';

@Component({
  selector: 'app-viewproject',
  standalone: true,
  imports: [PhaseComponent, CommonModule],
  providers: [NgbAccordionDirective],
  templateUrl: './viewproject.component.html',
  styleUrl: './viewproject.component.css',
})
export class ViewprojectComponent {
  fundraisingInfo: Fundraising | undefined = undefined;
  phases: any[] = [];
  fundraiserId: number = 0;
  readonly dialog = inject(MatDialog);
  constructor(
    private crudService: CrudService<any>,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((p) => {
      const { id } = p;
      this.fundraiserId = id;
      this.crudService
        .getById(`fundraising/getfundraising`, id)
        .subscribe((data) => {
          this.fundraisingInfo = data as Fundraising;
        });
    });
  }
  navigateTo(dir: string) {
    window.location.href = dir;
  }
  suspendProject() {
    this.crudService
      .update('fundraising/verifyfundraise', this.fundraiserId, {
        is_verified: false,
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
  verifyProject() {
    this.crudService
      .update('fundraising/verifyfundraise', this.fundraiserId, {
        is_verified: true,
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
  openFacilitatorAssignmentDialog() {
    this.dialog.open(AssignfacilitatorComponent, {
      data: {
        fundraisingId: this.fundraiserId,
      },
    });
  }
}
