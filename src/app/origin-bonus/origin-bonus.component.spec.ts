import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginBonusComponent } from './origin-bonus.component';

describe('OriginBonusComponent', () => {
  let component: OriginBonusComponent;
  let fixture: ComponentFixture<OriginBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginBonusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
