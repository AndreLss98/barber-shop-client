import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartoesPage } from './cartoes.page';

describe('CartoesPage', () => {
  let component: CartoesPage;
  let fixture: ComponentFixture<CartoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartoesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
