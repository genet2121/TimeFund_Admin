import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignfacilitatorComponent } from './assignfacilitator.component';

describe('AssignfacilitatorComponent', () => {
  let component: AssignfacilitatorComponent;
  let fixture: ComponentFixture<AssignfacilitatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignfacilitatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignfacilitatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
