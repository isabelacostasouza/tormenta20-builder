import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTormentaComponent } from './app-tormenta.component';

describe('AppTormentaComponent', () => {
  let component: AppTormentaComponent;
  let fixture: ComponentFixture<AppTormentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppTormentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTormentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
