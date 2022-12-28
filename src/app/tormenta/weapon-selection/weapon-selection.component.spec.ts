import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponSelectionComponent } from './weapon-selection.component';

describe('WeaponSelectionComponent', () => {
  let component: WeaponSelectionComponent;
  let fixture: ComponentFixture<WeaponSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
