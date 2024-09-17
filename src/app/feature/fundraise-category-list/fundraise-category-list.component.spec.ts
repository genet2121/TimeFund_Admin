import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraiseCategoryListComponent } from './fundraise-category-list.component';

describe('FundraiseCategoryListComponent', () => {
  let component: FundraiseCategoryListComponent;
  let fixture: ComponentFixture<FundraiseCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundraiseCategoryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FundraiseCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
