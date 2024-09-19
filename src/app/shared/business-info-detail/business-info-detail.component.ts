import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CrudService } from '../../core/services/crud.service';

@Component({
  selector: 'app-business-info-detail',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './business-info-detail.component.html',
  styleUrl: './business-info-detail.component.css'
})
export class BusinessInfoDetailComponent {
  @Input() userId!: number;
  firstName: string = '';
  lastName: string = '';
  businessOrganizationInfo:any
  businessData:any
  imageUrl:any;
  constructor(private crudService: CrudService<any>){

  }
  ngOnInit() {
   this.crudService.getById('users/getuser', this.userId).subscribe((res) => {
    this.businessOrganizationInfo = res;
    const nameParts = res.fullName.trim().split(' ');
    this.firstName = nameParts[0];
    this.lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
   })
   this.crudService.getById('business/getbusiness', this.userId).subscribe((res) =>{
    this.businessData = res;
   } )
  this.imageUrl = this.crudService.imageUrl
  }
  navigateTo(dir: string) {
    window.open(dir, '_blank');
  }
}
