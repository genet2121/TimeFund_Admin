import { Component } from '@angular/core';
import { CrudService } from '../../core/crud.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Fundraising } from '../../core/model/fundraiser.model';
import { PhaseComponent } from "../../shared/phase/phase.component";

@Component({
  selector: 'app-viewproject',
  standalone: true,
  imports: [PhaseComponent],
  templateUrl: './viewproject.component.html',
  styleUrl: './viewproject.component.css',
})
export class ViewprojectComponent {
  fundraisingInfo: Fundraising | undefined = undefined;
  constructor(
    private crudService: CrudService<any>,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((p) => {
      const { id } = p;
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
}
