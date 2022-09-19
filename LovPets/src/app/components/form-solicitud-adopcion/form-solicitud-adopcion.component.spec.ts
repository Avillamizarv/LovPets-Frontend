import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolicitudAdopcionComponent } from './form-solicitud-adopcion.component';

describe('FormSolicitudAdopcionComponent', () => {
  let component: FormSolicitudAdopcionComponent;
  let fixture: ComponentFixture<FormSolicitudAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSolicitudAdopcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSolicitudAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
