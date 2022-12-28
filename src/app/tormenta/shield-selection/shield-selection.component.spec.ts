import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShieldSelectionComponent } from './shield-selection.component';

describe('ShieldSelectionComponent', () => {
  let component: ShieldSelectionComponent;
  let fixture: ComponentFixture<ShieldSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShieldSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShieldSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
