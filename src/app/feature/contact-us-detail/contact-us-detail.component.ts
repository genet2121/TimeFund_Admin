import { Component } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { ActivatedRoute } from '@angular/router';
import ContactUs from '../../core/model/contactUs.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us-detail.component.html',
  styleUrl: './contact-us-detail.component.css'
})
export class ContactUsDetailComponent {
  contactData!:ContactUs ;
  constructor(
    private crudService: CrudService<any>,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.subscribe((p) => {
      const { id } = p;
      this.crudService
        .getById(`contact/messages`, id)
        .subscribe((data) => {
          this.contactData =  data

        });

    });
  }

}
