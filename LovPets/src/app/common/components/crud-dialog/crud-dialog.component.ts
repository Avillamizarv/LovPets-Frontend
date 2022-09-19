import {
  AfterViewInit,
  Component,
  ComponentRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdDirective } from '../../directives/ad-component.directive';
import { Marco } from '../../models/crud/marco.model';
import { Respuesta } from '../../models/crud/respuesta.model';
/**
 * Componente que se muestra en el dialogo de material que contendrá mas componentes dentro.
 */
@Component({
  selector: 'app-crud-dialog',
  templateUrl: './crud-dialog.component.html',
  styleUrls: ['./crud-dialog.component.scss'],
})
export class CrudDialogComponent implements OnInit, AfterViewInit {
  /**
   * Acción ejecutada por el usuario.
   */
  @Output() accion = new EventEmitter<Respuesta>();

  /**
   * Directiva para injectar los componentes.
   */
  @ViewChild(AdDirective, { static: true })
  adHost!: AdDirective;

  /**
   * Formulario del componente.
   */
  public form!: UntypedFormGroup;

  /**
   * Referencia al componente interior.
   */
  componentRef!: ComponentRef<any>;


  /**
   * Constructor del componente.
   *
   * @param data - Data que se enviará al componente.
   * @param dialogRef - Referencia al dialogo.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Marco,
    public dialogRef: MatDialogRef<CrudDialogComponent>
  ) {}

  /**
   * Inicializa el componente.
   */
  ngOnInit(): void {
    if (this.adHost) {
      const viewContainerRef = this.adHost.viewContainerRef;
      viewContainerRef.clear();
      this.componentRef = viewContainerRef.createComponent(this.data.component);
      this.componentRef.instance.data = this.data.dataComponent;
    }
  }

  /**
   * Cambia la referencia actual del formulario.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.form = this.componentRef?.instance?.form;
    }, 0);
  }

  /**
   * Función al dar click en aceptar.
   * Envía el formulario por el subscribe.
   */
  aceptar() {
    if (!this.form?.invalid) {
      this.accion.emit({
        data: this.form?.getRawValue(),
        estado: true,
        dialogRef: null,
      });
    } else {
      this.form?.markAllAsTouched();
    }
  }

  /**
   * Cierra el dialogo.
   */
  async cerrar() {
    this.dialogRef.close();
    this.accion.emit({ data: null, estado: false, dialogRef: null });
  }

  /**
   * Función al dar click en la acción secundaria, generalmente es cerrar el modal o limpiar el formulario.
   */
  cancelar() {
    if (this.data.dataComponent?.editMode) {
      this.cerrar();
    } else {
      if (this.componentRef.instance.limpiarFormulario) {
        this.componentRef.instance.limpiarFormulario();
      } else {
        console.error(
          'Method limpiarFormulario() not exits at:̣̣ ' +
            this.componentRef.componentType.name
        );
      }
    }
  }
}
