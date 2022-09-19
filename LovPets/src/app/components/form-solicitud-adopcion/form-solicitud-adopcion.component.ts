import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from 'src/app/common/services/crud.service';
import { SolicitudAdopcionModel } from 'src/app/models/solicitud-adopcion-model';
import { SolicitudService } from 'src/app/service/solicitud.service';
import { NotRegisteredErrorComponent } from '../not-registered-error/not-registered-error.component';

@Component({
  selector: 'app-form-solicitud-adopcion',
  templateUrl: './form-solicitud-adopcion.component.html',
  styleUrls: ['./form-solicitud-adopcion.component.scss'],
})
export class FormSolicitudAdopcionComponent implements OnInit {
  /**
   * Input de una solicitud de adopción
   */
  @Input() solicitud: SolicitudAdopcionModel;

  /**
   * Input de modo de visualización para publicacion
   */
  @Input() viewModeUsuario: boolean;

  /**
   *Output de evento para recargar
   */
  @Output() recargar = new EventEmitter<boolean>();

  /**
   * Variable del formulario
   */
  form: UntypedFormGroup;

  /**
   * Variable que contiene las solicitudes de adopción para una publicación
   */
  solicitudesPub: SolicitudAdopcionModel[];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      insertMode?: boolean;
      viewMode?: boolean;
      editMode?: boolean;
      idUsuario?: number;
      idPublicacion?: number;
      solicitud?: SolicitudAdopcionModel;
      pubsUsuario?: boolean;
      solicitudesPub?: SolicitudAdopcionModel[];
    },
    private fb: UntypedFormBuilder,
    private crudService: CrudService,
    private serviceSolic: SolicitudService,
    private snackbar: MatSnackBar
  ) {}

  /**
   * Función de acciones a tomar al iniciar el componente
   */
  ngOnInit(): void {
    this.buildForm();
    this.otrasMascotasChanges();
    this.form.controls.idUsuario.setValue(this.data?.idUsuario);
    this.form.controls.idPublicacion.setValue(this.data?.idPublicacion);
    if (this.data?.editMode) {
      this.form.patchValue(this.data?.solicitud);
    }
    if (this.data?.viewMode) {
      this.solicitudesPub = this.data?.solicitudesPub;
    }
  }

  /**
   * Función que se ejecuta para crear el formulario de filtro por ciudad o tipo de animal
   * */
  buildForm() {
    this.form = this.fb.group({
      id: [],
      idUsuario: [],
      idPublicacion: [],
      fechaRegistro: [],
      condiciones: ['', Validators.required],
      otrasMascotas: [false],
      mascotas: [],
      estado: [2],
    });
  }

  /**
   * Función que escucha los cambios en el campo otrasMascotas
   */
  otrasMascotasChanges() {
    this.form.controls.otrasMascotas.valueChanges.subscribe((value) => {
      if (value) {
        this.form.controls.mascotas.addValidators(Validators.required);
      } else {
        this.form.controls.mascotas.removeValidators(Validators.required);
      }
      this.form.controls.mascotas.updateValueAndValidity();
    });
  }

  /**
   * Función para aceptar una solicitud
   *
   */
  aceptarSolicitud(idSolicitud: number) {
    this.serviceSolic.aceptarSolicitud(idSolicitud).subscribe((resp) => {
      if (resp) {
        this.openSnackBar(
          'Se aceptó la solicitud y se notificó al correo de los usuarios que tenían solicitudes sobre esta publicación.',
          'success'
        );
      } else {
        this.openSnackBar('No se pudo aceptar la solicitud.', 'error');
      }
    });
  }

  /**
   * Función para rechazar una solicitud
   *
   */
  rechazarSolicitud(idSolicitud: number) {
    this.serviceSolic.reachazarSolicitud(idSolicitud).subscribe((resp) => {
      if (resp) {
        this.openSnackBar(
          'Se rechazó la solicitud y se notificó al correo del usuario.',
          'success'
        );
      } else {
        this.openSnackBar('No se pudo rechazar la solicitud.', 'error');
      }
    });
  }

  /**
   * Función para editar una solicitud
   *
   */
  editarSolicitud(solicitud: SolicitudAdopcionModel) {
    this.crudService
      .show({
        component: FormSolicitudAdopcionComponent,
        dataComponent: {
          editMode: true,
          viewMode: false,
          solicitud: solicitud,
        },
        actions: {
          primary: 'Guardar',
        },
        title: 'Editar solicitud de adopción de ' + solicitud.nombreMascota,
        maxWidth: '800px',
      })
      .subscribe((res) => {
        if (res.estado) {
          this.serviceSolic.updateSolicitud(res.data).subscribe((resp) => {
            if (resp) {
              this.openSnackBar(
                'Se actualizó la solicitud exitosamente.',
                'success'
              );
              this.crudService.close(res.dialogRef);
              this.recargar.emit(true);
            }
          });
        }
      });
  }

  /**
   * Función para eliminar una solicitud
   *
   */
  eliminarSolicitud(nombre: string, idSolicitud: number) {
    this.crudService
      .show({
        component: NotRegisteredErrorComponent,
        dataComponent: {
          editMode: true,
          message:
            '¿Está seguro que desea eliminar la solicitud de adopción para ' +
            nombre +
            '?',
        },
        actions: {
          primary: 'Eliminar',
        },
        title: 'Eliminar solicitud de adopción para ' + nombre,
        maxWidth: '800px',
      })
      .subscribe((res) => {
        if (res.estado) {
          this.serviceSolic.deleteSolicitud(idSolicitud).subscribe((resp) => {
            if (resp) {
              this.openSnackBar(
                'Se eliminó la solicitud exitosamente.',
                'success'
              );
              this.crudService.close(res.dialogRef);
              this.recargar.emit(true);
            }
          });
        }
      });
  }

  /**
   * Función para limpiar el formulario
   *
   */
  limpiarFormulario() {
    this.form.reset();
    this.form.controls.otrasMascotas.setValue(false);
    this.form.controls.idUsuario.setValue(this.data?.idUsuario);
    this.form.controls.idPublicacion.setValue(this.data?.idPublicacion);
  }

  /**
   * Función para mostrar snackbars de notificaciones
   */
  openSnackBar(message: string, tipo: string) {
    this.snackbar.open(message, 'Ok', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5 * 1000,
      panelClass: tipo,
    });
  }
}
