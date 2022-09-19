import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMisSolicitudesComponent } from './view-mis-solicitudes.component';

describe('ViewMisSolicitudesComponent', () => {
  let component: ViewMisSolicitudesComponent;
  let fixture: ComponentFixture<ViewMisSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMisSolicitudesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMisSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
