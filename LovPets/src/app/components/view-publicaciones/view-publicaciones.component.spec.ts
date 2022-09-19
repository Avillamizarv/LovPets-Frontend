import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublicacionesComponent } from './view-publicaciones.component';

describe('ViewPublicacionesComponent', () => {
  let component: ViewPublicacionesComponent;
  let fixture: ComponentFixture<ViewPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPublicacionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
