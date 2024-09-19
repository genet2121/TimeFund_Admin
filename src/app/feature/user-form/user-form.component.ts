import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CrudService } from '../../core/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { BusinessInfoDetailComponent } from '../../shared/business-info-detail/business-info-detail.component';
import { CharityInfoDetailComponent } from '../../shared/charity-info-detail/charity-info-detail.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatIconModule, CommonModule, BusinessInfoDetailComponent, CharityInfoDetailComponent,],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  id!: number;
  individualUserData: any;
  firstName: string = '';
  lastName: string = '';

  constructor(
    private crudService: CrudService<any>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.loadUserData(this.id);
    });
  }

  loadUserData(id: number): void {
    this.crudService.getById('users/getuser', id).subscribe((res) => {
      this.individualUserData = res;
      const nameParts = res.fullName.trim().split(' ');
      this.firstName = nameParts[0];
      this.lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    });
  }


}
