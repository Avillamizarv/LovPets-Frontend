import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPublicacionAdopcionComponent } from './form-publicacion-adopcion.component';

describe('FormPublicacionAdopcionComponent', () => {
  let component: FormPublicacionAdopcionComponent;
  let fixture: ComponentFixture<FormPublicacionAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPublicacionAdopcionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPublicacionAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
