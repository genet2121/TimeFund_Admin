import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashborardcardComponent } from '../../shared/dashborardcard/dashborardcard.component';
import { CrudService } from '../../core/services/crud.service';
import dashboard from '../../core/model/dasboarddata.model';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';


import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
};

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
};
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, DashborardcardComponent, NgApexchartsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  @ViewChild("columnChart") columnChart: ChartComponent | undefined;
  @ViewChild("donutChart") donutChart: ChartComponent | undefined;

  public columnChartOptions: Partial<ChartOptions> | undefined;
  public donutChartOptions: Partial<DonutChartOptions> | undefined;

  constructor(private crudService: CrudService<any>) {

    const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8'];


    this.columnChartOptions = {
      series: [{
        data: [2100, 3200, 1500, 2800, 3600, 2400, 4300, 3900]
      }],
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {

          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {

        categories: [
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'
        ],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      }
    };


    this.donutChartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      labels: ["Total Project", "Total Fundraise", "Total Category", "Total User", "Total Donations"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };


  }
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

