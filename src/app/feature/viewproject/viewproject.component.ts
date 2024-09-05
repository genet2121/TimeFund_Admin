import { Component } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Fundraising } from '../../core/model/fundraiser.model';

@Component({
  selector: 'app-viewproject',
  standalone: true,
  imports: [],
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
