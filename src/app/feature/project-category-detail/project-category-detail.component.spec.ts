import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCategoryDetailComponent } from './project-category-detail.component';

describe('ProjectCategoryDetailComponent', () => {
  let component: ProjectCategoryDetailComponent;
  let fixture: ComponentFixture<ProjectCategoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCategoryDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
