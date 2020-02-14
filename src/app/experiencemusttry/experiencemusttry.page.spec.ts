import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceMustTryPage } from './experiencemusttry.page';

describe('ExperienceMustTryPage', () => {
  let component: ExperienceMustTryPage;
  let fixture: ComponentFixture<ExperienceMustTryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceMustTryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceMustTryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
