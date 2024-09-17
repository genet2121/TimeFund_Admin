import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfundraiserComponent } from './viewfundraiser.component';

describe('ViewfundraiserComponent', () => {
  let component: ViewfundraiserComponent;
  let fixture: ComponentFixture<ViewfundraiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewfundraiserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewfundraiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
