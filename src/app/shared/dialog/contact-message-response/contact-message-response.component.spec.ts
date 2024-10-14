import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMessageResponseComponent } from './contact-message-response.component';

describe('ContactMessageResponseComponent', () => {
  let component: ContactMessageResponseComponent;
  let fixture: ComponentFixture<ContactMessageResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMessageResponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactMessageResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
