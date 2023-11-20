import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkDisplayComponent } from './homework-display.component';

describe('HomeworkDisplayComponent', () => {
  let component: HomeworkDisplayComponent;
  let fixture: ComponentFixture<HomeworkDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeworkDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeworkDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
