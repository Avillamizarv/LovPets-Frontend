import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-selector-archivos',
  templateUrl: './selector-archivos.component.html',
  styleUrls: ['./selector-archivos.component.scss'],
})
export class SelectorArchivosComponent implements OnInit {
  /**
   * Variable que contiene la referencia al elemento del html
   */
  @ViewChild('ref') ref: ElementRef;

  /**
   * Emite el archivo seleccionado
   */
  @Output() files = new EventEmitter<any>();

  /**
   * Variable para limpiar el selector de archivos
   */
  @Input()
  limpiar!: boolean;

  /**
   * Variable para saber si el modal se abrió en modo edición y mostrar los botones descargar y cambiar imágen
   */
  @Input()
  editMode!: boolean;

  /**
   * Variable que contiene la imagen en base 64 en modo edición
   */

  @Input()
  imgBase64!: string;

  /**
   * Variable que contiene los tipos de archivo permitidos
   */
  @Input()
  accept!: string;

  /**
   * Variable que contiene el archivo de la imagen
   */
  archivo: File[] | null = null;

  /**
   * Constructor del componente.
   *
   */
  constructor() {}
  /**
   *Función que se ejecuta al iniciar el componente
   */
  ngOnInit(): void {
    if (!this.accept) {
      this.accept = 'image/png,image/jpeg,image/jpg';
    }
  }
  /**
   *
   */
  emitirArchivo($event: any) {
    this.archivo = $event?.target?.files;
    const estado = this.validarExtensiones();

    if (estado) {
      if (this.archivo) {
        this.files.emit(this.archivo[0]);
      } else {
        this.files.emit(null);
      }
    } else {
      let extensiones = '';
      this.accept.split(',').forEach((extension) => {
        extensiones = extensiones + extension.split('/')[1] + ', ';
      });
      extensiones = extensiones.slice(0, extensiones.length - 2);
      this.archivo = null;
      this.files.emit(this.archivo[0]);
    }
  }
  /**
   * Función para validar que las extensiones del archivo sean las permitidas
   */
  validarExtensiones() {
    let condition = true;
    if (this.archivo) {
      if (
        !(
          this.archivo[0].type &&
          this.archivo[0].type !== '' &&
          this.accept.includes(this.archivo[0].type)
        )
      ) {
        condition = false;
      }
      return condition;
    } else {
      return condition;
    }
  }

  /**
   * Función que escucha los cambios en los archivos
   */
  ngOnChanges(cambios: SimpleChanges) {
    if (cambios.limpiar) {
      this.archivo = null;
      this.files.emit(this.archivo);
      if (this.ref) {
        this.ref.nativeElement.value = '';
      }
    }
  }

  /**
   * Función para abrir un archivo en una nueva pestaña.
   *
   * @param url - Url del archivo a abrir.
   */
  openFile(file: any) {
    const fileObjectURL = URL.createObjectURL(file);
    window.open(fileObjectURL);
  }
}
