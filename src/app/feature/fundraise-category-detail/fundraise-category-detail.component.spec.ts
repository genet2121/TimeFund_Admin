import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraiseCategoryDetailComponent } from './fundraise-category-detail.component';

describe('FundraiseCategoryDetailComponent', () => {
  let component: FundraiseCategoryDetailComponent;
  let fixture: ComponentFixture<FundraiseCategoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundraiseCategoryDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundraiseCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
