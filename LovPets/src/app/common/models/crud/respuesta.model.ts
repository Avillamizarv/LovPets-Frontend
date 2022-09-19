import { MatDialogRef } from '@angular/material/dialog';
import { CrudDialogComponent } from '../../components/crud-dialog/crud-dialog.component';
/**
 * Interfaz que define el formato de respuesta que devolverá el crudService en el subscribe de su método show
 */
export interface Respuesta {
  /**
   * Indica la data que le devolvió el componente hijo, generalmente es el raw value del formulario.
   */
  data: any;
  /**
   * Valor booleano que en caso de ser true indica que se le dió click a aceptar y el formulario está validado de forma exitosa.
   */
  estado: boolean;
  /**
   * Referencia del diálogo abierto para poder cerrarlo.
   */
  dialogRef: MatDialogRef<CrudDialogComponent> | null;
}
