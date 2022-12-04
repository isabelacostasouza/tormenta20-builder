import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenMagicComponent } from './chosen-magic.component';

describe('ChosenMagicComponent', () => {
  let component: ChosenMagicComponent;
  let fixture: ComponentFixture<ChosenMagicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenMagicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenMagicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
