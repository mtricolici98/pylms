import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonViewComponent } from './lesson-view.component';

describe('LessonViewComponent', () => {
  let component: LessonViewComponent;
  let fixture: ComponentFixture<LessonViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonViewComponent]
    });
    fixture = TestBed.createComponent(LessonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
