import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { CrudService } from 'src/app/common/services/crud.service';
import { PublicacionAdopcionModel } from 'src/app/models/publicacion-adopcion-model';
import { SolicitudAdopcionModel } from 'src/app/models/solicitud-adopcion-model';
import { TipoMascotaModel } from 'src/app/models/tipo-mascota-model';
import { FileToBase64Pipe } from 'src/app/pipes/file-to-base-64.pipe';
import { PublicacionService } from 'src/app/service/publicacion.service';
import { SolicitudService } from 'src/app/service/solicitud.service';
import { FormSolicitudAdopcionComponent } from '../form-solicitud-adopcion/form-solicitud-adopcion.component';
import { NotRegisteredErrorComponent } from '../not-registered-error/not-registered-error.component';

@Component({
  selector: 'app-form-publicacion-adopcion',
  templateUrl: './form-publicacion-adopcion.component.html',
  styleUrls: ['./form-publicacion-adopcion.component.scss'],
  providers: [FileToBase64Pipe],
})
export class FormPublicacionAdopcionComponent implements OnInit {
  /**
   * Input de una publicación de adopción
   */
  @Input() publicacion: PublicacionAdopcionModel;

  /**
   * Input de modo de visualización
   */
  @Input() viewMode: boolean;

  /**
   * Input para saber si la lista de publicaciones es por usuario
   */
  @Input() pubsUsuario: boolean;

  /**
   *Output de evento para recargar
   */
  @Output() recargar = new EventEmitter<boolean>();

  /**
   * Variable del formulario
   */
  form: UntypedFormGroup;

  /**
   * Variable que guarda la subscripcion al crudservice para crear solicitud
   */
  subscriptionSolicitud: Subscription;

  /**
   * Variable que contiene la lista de tipos de mascota
   * */
  tiposMascota: Observable<TipoMascotaModel[]>;

  /**
   * Variable que contiene la lista de géneros
   * */
  generos = [{ nombre: 'Macho' }, { nombre: 'Hembra' }];

  /**
   * Variable que contiene la lista de unidades de tiempo
   * */
  unidadesTiempo = [
    { nombre: 'Años' },
    { nombre: 'Meses' },
    { nombre: 'Semanas' },
    { nombre: 'Días' },
  ];

  /**
   * Variable que contiene los tipos de archivos permitidos para la imágen.
   */
  tiposPermitidos = 'image/jpg,image/jpeg,image/png';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      insertMode?: boolean;
      viewMode?: boolean;
      editMode?: boolean;
      publicacion?: PublicacionAdopcionModel;
    },
    private fb: UntypedFormBuilder,
    private fileToBase64: FileToBase64Pipe,
    private crudService: CrudService,
    private servicePub: PublicacionService,
    private snackbar: MatSnackBar,
    private serviceSolic: SolicitudService
  ) {}

  /**
   * Función de acciones a tomar al iniciar el componente
   */
  ngOnInit(): void {
    this.getTiposMascota();
    this.buildForm();
    this.edadChanges();
    if (this.data?.editMode) {
      this.form.patchValue(this.data?.publicacion);
    }
  }

  /**
   * Función que se ejecuta para crear el formulario de filtro por ciudad o tipo de animal
   * */
  buildForm() {
    this.form = this.fb.group({
      id: [],
      idUsuario: [],
      nombre: ['', Validators.required],
      nombreTipoMascota: [],
      idTipoMascota: ['', Validators.required],
      edad: [],
      unidadEdad: ['Años'],
      genero: [],
      raza: [],
      gustos: [],
      observaciones: [],
      imagenB64: ['', [Validators.required]],
    });
  }

  /**
   * Función para obtener los tipos de mascota
   */
  getTiposMascota() {
    this.tiposMascota = this.servicePub.getTiposMascota();
  }

  /**
   * Función que escucha los cambios en el campo edad
   */
  edadChanges() {
    this.form.controls.edad.valueChanges.subscribe((value) => {
      if (value < 1) {
        this.form.controls.edad.setErrors({
          edadIncorrecta: true,
        });
      }
    });
  }

  /**
   * Función para solicitar una adopción
   *
   */
  solicitarAdopcion(idUsuario: number, idPublicacion: number, nombre: string) {
    if (!idUsuario) {
      this.crudService
        .show({
          component: NotRegisteredErrorComponent,
          dataComponent: {
            viewMode: true,
            message:
              'Para poder realizar una solicitud de adopción debe estar registrado e iniciar sesión.',
          },
          title: 'Inicia sesión',
          maxWidth: '300px',
        })
        .subscribe((res) => {
          this.crudService.close(res.dialogRef);
        });
    } else {
      this.subscriptionSolicitud = this.crudService
        .show({
          component: FormSolicitudAdopcionComponent,
          dataComponent: {
            insertMode: true,
            viewMode: false,
            idUsuario: idUsuario,
            idPublicacion: idPublicacion,
          },
          actions: {
            primary: 'Enviar solicitud',
          },
          title: 'Solicitar adopción de ' + nombre,
          maxWidth: '800px',
        })
        .subscribe((result) => {
          if (result.estado) {
            result.data.idUsuario = idUsuario;
            this.serviceSolic
              .addSolicitud(result.data as SolicitudAdopcionModel)
              .subscribe((res) => {
                if (res) {
                  this.openSnackBar(
                    'Se registró su solicitud exitosamente.',
                    'success'
                  );
                  this.crudService.close(result.dialogRef);
                }
              });
          }
        });
    }
  }

  /**
   * Función para ver las solicitudes de adopción para una publicación
   *
   */
  verSolicitudes(nombre: string, idPublicacion: number) {
    this.serviceSolic.getSolicitudesByPub(idPublicacion).subscribe((res) => {
      if (res) {
        const solicitudesPub = res;
        this.crudService
          .show({
            component: FormSolicitudAdopcionComponent,
            dataComponent: {
              pubsUsuario: this.pubsUsuario,
              insertMode: false,
              viewMode: true,
              idPublicacion: idPublicacion,
              solicitudesPub: solicitudesPub,
            },
            title: 'Solicitudes de adopción para ' + nombre,
            maxWidth: '800px',
          })
          .subscribe((res) => {
            this.crudService.close(res.dialogRef);
          });
      } else {
        this.openSnackBar(
          'Esta publicación no tiene solicitudes de adopción.',
          'error'
        );
      }
    });
  }

  /**
   * Función para ver las solicitudes de adopción para una publicación
   *
   */
  actualizarPub(publicacion: PublicacionAdopcionModel) {
    this.crudService
      .show({
        component: FormPublicacionAdopcionComponent,
        dataComponent: {
          insertMode: false,
          editMode: true,
          publicacion: publicacion,
        },
        actions: {
          primary: 'Guardar',
        },
        title: 'Actualizar información de  ' + publicacion.nombre,
        maxWidth: '800px',
      })
      .subscribe((res) => {
        if (res.estado) {
          this.servicePub.updatePublicacion(res.data).subscribe((response) => {
            if (response) {
              this.openSnackBar(
                'Se actualizó la publicación esxitosamente',
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
   * Función para eliminar una publicación de adopción
   */
  eliminarPub(idPublicacion: number, nombre: string) {
    this.crudService
      .show({
        component: NotRegisteredErrorComponent,
        dataComponent: {
          editMode: true,
          message:
            '¿Está seguro que desea eliminar la publicación de adopción para ' +
            nombre +
            '?',
        },
        actions: {
          primary: 'Eliminar',
        },
        title: 'Eliminar publicación de ' + nombre,
        maxWidth: '600px',
      })
      .subscribe((resp) => {
        if (resp.estado) {
          this.servicePub.deletePublicacion(idPublicacion).subscribe((res) => {
            if (res) {
              this.openSnackBar(
                'Se eliminó la publicación exitosamente.',
                'success'
              );
            }
            this.crudService.close(resp.dialogRef);
            this.recargar.emit(true);
          });
        }
      });
  }

  /**
   * Función para cambiar la imágen
   *
   */
  cambiarImagen($event: File) {
    this.fileToBase64.transform($event).then((base64) => {
      this.form.controls.imagenB64.setValue(base64);
      this.form.controls.imagenB64.markAsTouched();
    });
  }

  /**
   * Función para limpiar el formulario
   *
   */
  limpiarFormulario() {
    this.form.reset();
    this.form.controls.idUsuario.setValue(this.data?.publicacion.idUsuario);
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
