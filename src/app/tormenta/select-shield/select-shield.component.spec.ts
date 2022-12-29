import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShieldComponent } from './select-shield.component';

describe('SelectShieldComponent', () => {
  let component: SelectShieldComponent;
  let fixture: ComponentFixture<SelectShieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectShieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectShieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
