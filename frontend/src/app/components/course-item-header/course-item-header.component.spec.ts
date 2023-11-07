import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemHeader } from './course-item-header.component';

describe('CourseItemLargeComponent', () => {
  let component: CourseItemHeader;
  let fixture: ComponentFixture<CourseItemHeader>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseItemHeader]
    });
    fixture = TestBed.createComponent(CourseItemHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
