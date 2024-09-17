import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedCampaignComponent } from './reported-campaign.component';

describe('ReportedCampaignComponent', () => {
  let component: ReportedCampaignComponent;
  let fixture: ComponentFixture<ReportedCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedCampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportedCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
