import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMagicComponent } from './select-magic.component';

describe('SelectMagicComponent', () => {
  let component: SelectMagicComponent;
  let fixture: ComponentFixture<SelectMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMagicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
