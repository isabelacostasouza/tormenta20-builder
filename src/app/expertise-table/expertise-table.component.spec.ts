import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseTableComponent } from './expertise-table.component';

describe('ExpertiseTableComponent', () => {
  let component: ExpertiseTableComponent;
  let fixture: ComponentFixture<ExpertiseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertiseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertiseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
