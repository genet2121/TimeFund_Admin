import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportedCampaignComponent } from './view-reported-campaign.component';

describe('ViewReportedCampaignComponent', () => {
  let component: ViewReportedCampaignComponent;
  let fixture: ComponentFixture<ViewReportedCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReportedCampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewReportedCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
