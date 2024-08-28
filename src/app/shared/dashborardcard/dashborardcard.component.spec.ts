import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashborardcardComponent } from './dashborardcard.component';

describe('DashborardcardComponent', () => {
  let component: DashborardcardComponent;
  let fixture: ComponentFixture<DashborardcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashborardcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashborardcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
