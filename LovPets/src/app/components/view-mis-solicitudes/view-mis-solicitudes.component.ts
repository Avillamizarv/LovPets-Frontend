import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SolicitudAdopcionModel } from 'src/app/models/solicitud-adopcion-model';
import { SolicitudService } from 'src/app/service/solicitud.service';

@Component({
  selector: 'app-view-mis-solicitudes',
  templateUrl: './view-mis-solicitudes.component.html',
  styleUrls: ['./view-mis-solicitudes.component.scss'],
})
export class ViewMisSolicitudesComponent implements OnInit {
  /**
   * Input para saber si está en la sección de mis solicitudes
   * */
  @Input() misSolicMode: boolean;

  /**
   * Variable que contiene la lista de mis solicitudes
   * */
  misSolicitudes: SolicitudAdopcionModel[];

  constructor(
    private serviceSolic: SolicitudService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.misSolicMode) {
      //LLAMO AL SERVICIO PARA OBTENER LAS SOLICITUDES DEL USUARIO
      this.getSolicitudesUser(2);
    }
  }

  /**
   * Función para obtener las solicitudes de un usuario
   */
  getSolicitudesUser(idUsuario: number) {
    this.serviceSolic.getSolicitudesByUser(idUsuario).subscribe((res) => {
      if (res) {
        this.misSolicitudes = res;
      } else {
        this.openSnackBar('No tiene solicitudes registradas.', 'error');
        this.misSolicitudes = [];
      }
    });
  }

  /**
   * Función para recargar la lista de solicitudes después de hacer una actualización o eliminación
   */
  recargar(){
    this.getSolicitudesUser(2);
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
