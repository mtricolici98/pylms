import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemLargeComponent } from './course-item-large.component';

describe('CourseItemLargeComponent', () => {
  let component: CourseItemLargeComponent;
  let fixture: ComponentFixture<CourseItemLargeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemLargeComponent]
    });
    fixture = TestBed.createComponent(CourseItemLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
