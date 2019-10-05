import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapItemComponent } from './map-item.component';

describe('MapItemComponent', () => {
  let component: MapItemComponent;
  let fixture: ComponentFixture<MapItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
