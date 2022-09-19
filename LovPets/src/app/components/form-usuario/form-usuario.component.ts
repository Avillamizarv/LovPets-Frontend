import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { CiudadModel } from 'src/app/models/ciudad-model';
import { UsuarioModel } from 'src/app/models/usuario-model';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss'],
})
export class FormUsuarioComponent implements OnInit {
  /**
   * Variable del formulario
   */
  form: UntypedFormGroup;

  /**
   * Observable al cambio en la selección de ciudad
   * */
  filteredOptions: Observable<CiudadModel[]>;

  //LLENO ESTAS LISTAS CON CONSULTAS A BACK
  /**
   * Variable que contiene la lista ciudades
   * */
  ciudades: CiudadModel[] = [
    { id: 1, nombre: 'Bucaramanga' },
    { id: 2, nombre: 'Pamplona' },
    { id: 3, nombre: 'Silos' },
    { id: 4, nombre: 'Cúcuta' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      insertMode?: boolean;
      editMode?: boolean;
      usuario?: UsuarioModel;
    },
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.filteredOptions = this.form.controls.idCiudad.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const nombre = typeof value === 'string' ? value : value?.nombre;
        return nombre ? this._filter(nombre as string) : this.ciudades.slice();
      })
    );
    if (this.data?.editMode) {
      this.form.patchValue(this.data?.usuario);
      this.form.controls.contrasena.removeValidators(Validators.required);
      this.form.controls.confirmarContrasena.removeValidators(
        Validators.required
      );
    }
    this.onConfirmaContrasenaChanges();
  }

  /**
   * Función que escucha los cambios en las contraseñas
   * */
  onConfirmaContrasenaChanges() {
    this.form.controls.contrasena.valueChanges.subscribe((value) => {
      if (value != null) {
        this.form.controls.confirmarContrasena.enable();
      }
    });
    this.form.controls.confirmarContrasena.valueChanges.subscribe((value) => {
      if (value != null && value != this.form.controls.contrasena.value) {
        this.form.controls.confirmarContrasena.setErrors({
          confirmacionIncorrecta: true,
        });
      }
    });
  }

  /**
   *Funciones para realizar el filtro de ciudades
   */
  displayFn(ciudad: CiudadModel): string {
    return ciudad && ciudad.nombre ? ciudad.nombre : '';
  }

  private _filter(nombre: string): CiudadModel[] {
    const filterValue = nombre.toLowerCase();

    return this.ciudades.filter((ciudad) =>
      ciudad.nombre.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Función que se ejecuta para crear el formulario de filtro por ciudad o tipo de animal
   * */
  buildForm() {
    this.form = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      idCiudad: ['', Validators.required],
      nombreCiudad: [],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      confirmarContrasena: [
        { value: '', disabled: true },
        [Validators.required],
      ],
    });
  }

  /**
   * Función para limpiar el formulario
   *
   */
  limpiarFormulario() {
    this.form.reset();
  }
}
