import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fundraising } from '../../core/model/fundraiser.model';
import { CrudService } from '../../core/services/crud.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewfundraiser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewfundraiser.component.html',
  styleUrl: './viewfundraiser.component.css',
})
export class ViewfundraiserComponent {
  fundraisingInfo: Fundraising | undefined = undefined;
  phases: any[] = [];
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
}
