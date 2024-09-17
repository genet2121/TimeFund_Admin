import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewwithdrawalrequestComponent } from './viewwithdrawalrequest.component';

describe('ViewwithdrawalrequestComponent', () => {
  let component: ViewwithdrawalrequestComponent;
  let fixture: ComponentFixture<ViewwithdrawalrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewwithdrawalrequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewwithdrawalrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
