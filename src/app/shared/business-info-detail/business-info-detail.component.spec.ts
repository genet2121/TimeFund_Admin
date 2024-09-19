import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInfoDetailComponent } from './business-info-detail.component';

describe('BusinessInfoDetailComponent', () => {
  let component: BusinessInfoDetailComponent;
  let fixture: ComponentFixture<BusinessInfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessInfoDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
