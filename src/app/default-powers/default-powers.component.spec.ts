import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPowersComponent } from './default-powers.component';

describe('DefaultPowersComponent', () => {
  let component: DefaultPowersComponent;
  let fixture: ComponentFixture<DefaultPowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultPowersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
