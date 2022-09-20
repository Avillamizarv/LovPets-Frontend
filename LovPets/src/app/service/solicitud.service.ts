import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError, tap, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SolicitudAdopcionModel } from '../models/solicitud-adopcion-model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  /**
   * Función que consume el servicio de listar solicitudes por publicación
   */
  getSolicitudesByPub(
    idPublicacion: number
  ): Observable<SolicitudAdopcionModel[]> {
    return this.http
      .get<SolicitudAdopcionModel[]>(
        `${environment.urlBackLovPets}/solicitud/publicacionID/${idPublicacion}`
      )
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (res?.length < 1) {
            this.openSnackBar(
              'No existen solicitudes relacionadas a esta publicación.',
              'error'
            );
          }
        })
      );
  }

  /**
   * Función que consume el servicio de listar solicitudes por usuario
   */
  getSolicitudesByUser(
    idUsuario: number
  ): Observable<SolicitudAdopcionModel[]> {
    return this.http
      .get<SolicitudAdopcionModel[]>(
        `${environment.urlBackLovPets}/solicitud/userID/${idUsuario}`
      )
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (res?.length < 1) {
            this.openSnackBar(
              'No existen solicitudes relacionadas a su usuario.',
              'error'
            );
          }
        })
      );
  }

  /**
   * Función que consume el servicio de crear una solicitud
   */
  addSolicitud(
    solicitud: SolicitudAdopcionModel
  ): Observable<SolicitudAdopcionModel> {
    return this.http
      .post<SolicitudAdopcionModel>(
        `${environment.urlBackLovPets}/solicitud`,
        solicitud
      )
      .pipe(
        catchError((err) => {
          this.openSnackBar('Usted ya tiene una solicitud de adopción para esta mascota.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (res == null) {
            this.openSnackBar('No se pudo guardar la solicitud.', 'error');
          }
        })
      );
  }
  /**
   * Función que consume el servicio de actualizar una solicitud
   */
  updateSolicitud(solicitud: SolicitudAdopcionModel) {
    return this.http
      .put<boolean>(`${environment.urlBackLovPets}/solicitud`, solicitud)
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (res) {
            this.openSnackBar(
              'Su solicitud se actualizó exitosamente.',
              'success'
            );
          }
        })
      );
  }
  /**
   * Función que consume el servicio de eliminar una solicitud
   */
  deleteSolicitud(id: number) {
    return this.http
      .delete<boolean>(`${environment.urlBackLovPets}/solicitud/id/${id}`)
      .pipe(
        catchError(() => {
          this.openSnackBar('No se pudo eliminar la solicitud.', 'error');
          return of(false);
        }),
        tap((res) => {
          if (res) {
            this.openSnackBar(
              'La solicitud fue eliminada exitosamente',
              'success'
            );
          }
        })
      );
  }

  /**
   * Función que consume el servicio de aceptar una solicitud
   */
  aceptarSolicitud(idSolicitud: number) {
    return this.http
      .post<boolean>(
        `${environment.urlBackLovPets}/solicitud/aceptar?idSolicitud=${idSolicitud}`,
        ''
      )
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (!res) {
            this.openSnackBar('No se pudo aceptar la solicitud.', 'error');
          }
        })
      );
  }
  /**
   * Función que consume el servicio de rechazar una solicitud
   */
  reachazarSolicitud(idSolicitud: number) {
    return this.http
      .post<boolean>(
        `${environment.urlBackLovPets}/solicitud/rechazar?idSolicitud=${idSolicitud}`,
        ''
      )
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (!res) {
            this.openSnackBar('No se pudo rechazar la solicitud.', 'error');
          }
        })
      );
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
