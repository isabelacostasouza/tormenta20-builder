import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAttributesComponent } from './base-attributes.component';

describe('BaseAttributesComponent', () => {
  let component: BaseAttributesComponent;
  let fixture: ComponentFixture<BaseAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
