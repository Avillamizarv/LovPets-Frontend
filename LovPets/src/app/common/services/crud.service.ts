import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Marco } from '../models/crud/marco.model';
import { Respuesta } from '../models/crud/respuesta.model';
import { CrudDialogComponent } from '../components/crud-dialog/crud-dialog.component';
/**
 * Servicio manejar formularios crud en forma de modales
 *
 * @export
 * @class CrudService
 */
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  /**
   * Referencias de diálogos abiertos
   */
  referencias: Map<
    MatDialogRef<CrudDialogComponent>,
    MatDialogRef<CrudDialogComponent>
  > = new Map();
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CrudDialogComponent>
  ) {}
  /**
   * Método para abrir un dialogo de crud
   * @param {Marco} data - Datos de configuración del diálogo
   * @returns
   */
  public show(data: Marco): Observable<Respuesta> {
    return new Observable((observer: any) => {
      const ref = this.dialog.open(CrudDialogComponent, {
        disableClose: true,
        panelClass: 'modalax12789',
        maxHeight: '90vh',
        maxWidth: data.maxWidth ? data.maxWidth : '600px',
        minWidth: '300px',
        width: '95%',
        data,
      });
      this.referencias.set(ref, ref);
      this.dialogRef = ref;
      this.dialogRef.componentInstance.accion.subscribe(
        (accion: Respuesta) => {
          accion.dialogRef = ref;
          observer.next(accion);
        },
        (err: any) => {
          observer.error(err);
        }
      );
    });
  }
  /**
   * Método para cerrar un dialogo de crud
   * @param {MatDialogRef<CrudDialogComponent>} dialogRef - Referencia del diálogo
   */
  public close(dialogRef?: MatDialogRef<CrudDialogComponent>) {
    if (dialogRef) {
      this.referencias.get(dialogRef)?.close();
      this.referencias.delete(dialogRef);
    } else {
      this.dialogRef.close();
    }
  }
}
