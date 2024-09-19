import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityInfoDetailComponent } from './charity-info-detail.component';

describe('CharityInfoDetailComponent', () => {
  let component: CharityInfoDetailComponent;
  let fixture: ComponentFixture<CharityInfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharityInfoDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharityInfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
