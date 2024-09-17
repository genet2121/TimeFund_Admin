import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashborardcardComponent } from '../../shared/dashborardcard/dashborardcard.component';
import { CrudService } from '../../core/services/crud.service';
import dashboard from '../../core/model/dasboarddata.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, DashborardcardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private crudService: CrudService<any>) {}
  totalUsers: string = '0';
  totalProjects: string = '0';
  totalFundraisers: string = '0';
  totalBlogs: string = '0';
  ngOnInit() {
    this.fetchAllDashboardData();
  }
  fetchAllDashboardData() {
    this.crudService.getAll(`dashboard/counts`).subscribe((result: any) => {
      const fetchedData = result as dashboard;
      this.totalUsers = fetchedData.totalUsers.toString();
      this.totalProjects = fetchedData.totalProjects.toString();
      this.totalFundraisers = fetchedData.totalFundraisers.toString();
    });
  }
}
