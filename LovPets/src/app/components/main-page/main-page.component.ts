import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CrudService } from 'src/app/common/services/crud.service';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { FormPublicacionAdopcionComponent } from '../form-publicacion-adopcion/form-publicacion-adopcion.component';
import { FormUsuarioComponent } from '../form-usuario/form-usuario.component';
import { InicioSesionComponent } from '../inicio-sesion/inicio-sesion.component';
import { NotRegisteredErrorComponent } from '../not-registered-error/not-registered-error.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  /**
   * Variable que indica si se inició sesión o no
   */
  inicioSesion: boolean = false;

  /**
   * Variable que contiene un usuario de prueba
   */
  usuario: UsuarioModel = {
    id: 1,
    nombre: 'Lupita Villamizar Vera',
    direccion: 'Cra 51 #23-23',
    idCiudad: 3,
    nombreCiudad: 'Silos',
    telefono: '321112232',
    correo: 'lupe@gmail.com',
    contrasena: '',
    confirmarContrasena: '',
  };

  /**
   * Variable que indica si estoy en la sección de mis publicaciones
   */
  misPubsMode: boolean = false;

  /**
   * Variable que indica si estoy en la sección de mis solicitudes
   */
  misSolicMode: boolean = false;

  /**
   * Variable que contiene la subscripción al servicio del crud
   */
  subscriptionPublicar: Subscription;

  /**
   * Contructor del componente
   * @param crudService - Servicio de crud.
   */
  constructor(
    private crudService: CrudService,
    private snackbar: MatSnackBar
  ) {}

  /**Función para publicar una nueva mascota en adopción */
  publicarAdopcion() {
    if (!this.inicioSesion) {
      this.crudService
        .show({
          component: NotRegisteredErrorComponent,
          dataComponent: {
            viewMode: true,
            message:
              'Para poder realizar publicaciones primero debe registrarse e iniciar sesión.',
          },
          title: 'Inicia sesión',
          maxWidth: '300px',
        })
        .subscribe((res) => {
          if (res.estado) {
            console.log('se sale');
          }
        });
    } else {
      this.subscriptionPublicar = this.crudService
        .show({
          component: FormPublicacionAdopcionComponent,
          dataComponent: {
            insertMode: true,
            viewMode: false,
          },
          actions: {
            primary: 'Publicar',
          },
          title: 'Publicar mascota',
          maxWidth: '800px',
        })
        .subscribe((res) => {
          if (res.estado) {
            console.log('va a guardar la publicación');
          }
        });
    }
  }

  /**
   * Función para ver mis publicaciones
   */
  misPublicaciones() {
    if (!this.inicioSesion) {
      this.crudService
        .show({
          component: NotRegisteredErrorComponent,
          dataComponent: {
            viewMode: true,
            message:
              'Para poder ver sus publicaciones debe estar registrado e iniciar sesión.',
          },
          title: 'Inicia sesión',
          maxWidth: '300px',
        })
        .subscribe((res) => {
          if (res.estado) {
            console.log('se sale');
          }
        });
    } else {
      this.misPubsMode = true;
      this.misSolicMode = false;
    }
  }

  /**
   * Función para ver mis solicitudes
   */
  misSolicitudes() {
    if (!this.inicioSesion) {
      this.crudService
        .show({
          component: NotRegisteredErrorComponent,
          dataComponent: {
            viewMode: true,
            message:
              'Para poder ver sus solicitudes debe estar registrado e iniciar sesión.',
          },
          title: 'Inicia sesión',
          maxWidth: '300px',
        })
        .subscribe((res) => {
          if (res.estado) {
            console.log('se sale');
          }
        });
    } else {
      this.misSolicMode = true;
      this.misPubsMode = false;
    }
  }

  /**
   * Función para volver al inicio
   */
  volverInicio() {
    this.misPubsMode = false;
    this.misSolicMode = false;
  }

  iniciarSesion() {
    this.crudService
      .show({
        component: InicioSesionComponent,
        dataComponent: {
          editMode: true,
          insertMode: false,
        },
        actions: {
          primary: 'Ingresar',
        },
        title: 'Iniciar sesión',
        maxWidth: '500px',
      })
      .subscribe((res) => {
        if (res.estado) {
          this.inicioSesion = true;
          this.crudService.close();
          //LLAMO AL SERVICIO PARA INICIO DE SESIÓN
          this.openSnackBar('Inicio de sesión exitoso.', 'success');
        }
        this.crudService.close();
      });
  }

  cerrarSesion() {
    this.inicioSesion = false;
    this.misPubsMode = false;
    this.misSolicMode = false;
    this.openSnackBar('Su sesión fue cerrada.', 'success');
  }

  editarInfoPersonal() {
    this.crudService
      .show({
        component: FormUsuarioComponent,
        dataComponent: {
          editMode: true,
          usuario: this.usuario,
        },
        actions: {
          primary: 'Guardar',
        },
        title: 'Actualizar información personal',
        maxWidth: '700px',
      })
      .subscribe((res) => {
        if (res.estado) {
          console.log('va a actualizar el usuario');
        }
      });
  }

  registroUsuario() {
    this.crudService
      .show({
        component: FormUsuarioComponent,
        dataComponent: {
          insertMode: true,
        },
        actions: {
          primary: 'Registrarse',
        },
        title: 'Registro',
        maxWidth: '600px',
      })
      .subscribe((res) => {
        if (res.estado) {
          console.log('va a guardar el usuario');
        }
      });
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
