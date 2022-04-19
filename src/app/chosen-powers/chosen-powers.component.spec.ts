import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenPowersComponent } from './chosen-powers.component';

describe('ChosenPowersComponent', () => {
  let component: ChosenPowersComponent;
  let fixture: ComponentFixture<ChosenPowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenPowersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
