import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultProficienciesComponent } from './default-proficiencies.component';

describe('DefaultProficienciesComponent', () => {
  let component: DefaultProficienciesComponent;
  let fixture: ComponentFixture<DefaultProficienciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultProficienciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultProficienciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
