import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CrudService } from '../../core/services/crud.service';

@Component({
  selector: 'app-charity-info-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './charity-info-detail.component.html',
  styleUrl: './charity-info-detail.component.css'
})
export class CharityInfoDetailComponent {
  @Input() userId!: number;
  charityOrganizationInfo:any;
  firstName: string = '';
  lastName: string = '';
  charityData:any
  imageUrl:any;
  constructor(private crudService: CrudService<any>){

  }
  ngOnInit() {
   this.crudService.getById('users/getuser', this.userId).subscribe((res) => {
    this.charityOrganizationInfo = res;
    const nameParts = res.fullName.trim().split(' ');
    this.firstName = nameParts[0];
    this.lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
   });
   this.crudService.getById('charity/getcharityby', this.userId).subscribe((res) =>{
    this.charityData = res;
   } )
  this.imageUrl = this.crudService.imageUrl
  }
  navigateTo(dir: string) {
    window.open(dir, '_blank');
  }



  }


