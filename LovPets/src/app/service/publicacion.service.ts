import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError, tap, map, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CiudadModel } from '../models/ciudad-model';
import { PublicacionAdopcionModel } from '../models/publicacion-adopcion-model';
import { TipoMascotaModel } from '../models/tipo-mascota-model';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  /**
   * Función que consume el servicio de listar publicaciones
   */
  getAllPublicaciones(): Observable<PublicacionAdopcionModel[]> {
    return this.http
      .get<PublicacionAdopcionModel[]>(
        `${environment.urlBackLovPets}/publicacion/all`
      )
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (res?.length < 1) {
            this.openSnackBar(
              'No existen publicaciones para mostrar.',
              'error'
            );
          }
        })
      );
  }

  /**
   * Función que consume el servicio de listar publicaciones por usuario
   */
  getAllPubsByUser(idUsuario: number): Observable<PublicacionAdopcionModel[]> {
    return this.http
      .get<PublicacionAdopcionModel[]>(
        `${environment.urlBackLovPets}/publicacion/userID/${idUsuario}`
      )
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (res?.length < 1) {
            this.openSnackBar(
              'No existen publicaciones relacionadas a su usuario.',
              'error'
            );
          }
        })
      );
  }

  /**
   * Función que consume el servicio de listar publicaciones filtradas por tipo /ciudad
   */
  getFilteredPubs(
    idCiudad: number,
    idTipoMascota: number
  ): Observable<PublicacionAdopcionModel[]> {
    return this.http
      .get<PublicacionAdopcionModel[]>(
        `${environment.urlBackLovPets}/publicacion/filtro?ciudad=${
          idCiudad ?? ''
        }&tipo=${idTipoMascota ?? ''}`
      )
      .pipe(
        tap((res) => {
          if (res?.length < 1) {
            this.openSnackBar(
              'No existen publicaciones con los filtros aplicados.',
              'error'
            );
          }
        })
      );
  }

  /**
   * Función que consume el servicio de crear una publicación
   */
  addPublicacion(
    publicacion: PublicacionAdopcionModel
  ): Observable<PublicacionAdopcionModel> {
    return this.http
      .post<PublicacionAdopcionModel>(
        `${environment.urlBackLovPets}/publicacion`,
        publicacion
      )
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (res == null) {
            this.openSnackBar('No se pudo guardar la publicación.', 'error');
          }
        })
      );
  }

  /**
   * Función que consume el servicio de actualizar una publicación
   */

  updatePublicacion(publicacion: PublicacionAdopcionModel) {
    return this.http
      .put<boolean>(`${environment.urlBackLovPets}/publicacion`, publicacion)
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (res) {
            this.openSnackBar(
              'Su publicación se actualizó exitosamente.',
              'success'
            );
          }
        })
      );
  }
  /**
   * Función que consume el servicio de eliminar una publicación
   */
  deletePublicacion(id: number) {
    return this.http
      .delete<boolean>(`${environment.urlBackLovPets}/publicacion/id/${id}`)
      .pipe(
        catchError(() => {
          this.openSnackBar('No se pudo eliminar la publicación.', 'error');
          return of(false);
        }),
        tap((res) => {
          if (res) {
            this.openSnackBar(
              'La publicación fue eliminada exitosamente',
              'success'
            );
          }
        })
      );
  }
  /**
   * Función que consume el servicio de listar los tipos de mascota
   */
  getTiposMascota(): Observable<TipoMascotaModel[]> {
    return this.http
      .get<TipoMascotaModel[]>(`${environment.urlBackLovPets}/tipoMascota/all`)
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
        }),
        tap((res) => {
          if (res?.length < 1) {
            this.openSnackBar(
              'No existen tipos de mascota registrados.',
              'error'
            );
          }
        })
      );
  }

  /**
   * Función que consume el servicio de listar las ciudades
   */
  getCiudades(): Observable<CiudadModel[]> {
    return this.http
      .get<CiudadModel[]>(`${environment.urlBackLovPets}/ciudad/all`)
      .pipe(
        catchError((err) => {
          this.openSnackBar('Hubo un error interno.', 'error');
          return throwError(err);
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
