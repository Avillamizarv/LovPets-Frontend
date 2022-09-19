import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent implements OnInit {
  /**
   * Variable del formulario
   */
  form: UntypedFormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {},
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * Función que se ejecuta para crear el formulario inicio de sesión
   * */
  buildForm() {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }
}
