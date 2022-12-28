import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorSelectionComponent } from './armor-selection.component';

describe('ArmorSelectionComponent', () => {
  let component: ArmorSelectionComponent;
  let fixture: ComponentFixture<ArmorSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
