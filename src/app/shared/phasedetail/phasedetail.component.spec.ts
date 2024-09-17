import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasedetailComponent } from './phasedetail.component';

describe('PhasedetailComponent', () => {
  let component: PhasedetailComponent;
  let fixture: ComponentFixture<PhasedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhasedetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhasedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
