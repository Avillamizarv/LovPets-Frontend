import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, startWith } from 'rxjs';
import { CiudadModel } from 'src/app/models/ciudad-model';
import { PublicacionAdopcionModel } from 'src/app/models/publicacion-adopcion-model';
import { TipoMascotaModel } from 'src/app/models/tipo-mascota-model';
import { PublicacionService } from 'src/app/service/publicacion.service';

@Component({
  selector: 'app-view-publicaciones',
  templateUrl: './view-publicaciones.component.html',
  styleUrls: ['./view-publicaciones.component.scss'],
})
export class ViewPublicacionesComponent implements OnInit {
  @Output() recargarLista = new EventEmitter<boolean>();
  /**
   * Input para saber si está en la sección de mis publicaciones
   * */
  @Input() misPubsMode: boolean;
  /**
   * Variable del formulario
   * */
  form: UntypedFormGroup;

  /**
   * Observable al cambio en la selección de ciudad
   * */
  filteredOptions: Observable<CiudadModel[]>;

  /**
   * Variable que contiene la lista de tipos de mascota
   * */
  tiposMascota: Observable<TipoMascotaModel[]>;

  /**
   * Variable que contiene la lista ciudades
   * */
  ciudades: CiudadModel[];

  /**
   * Variable que contiene la lista de publicaciones
   * */
  @Input() publicaciones: Observable<PublicacionAdopcionModel[]>;

  constructor(
    private fb: UntypedFormBuilder,
    private servicePub: PublicacionService,
    private snackbar: MatSnackBar
  ) {}

  /**
   * Función que se ejecuta al inicializar el componente
   * */
  ngOnInit(): void {
    this.getTiposMascota();
    this.getCiudades();
    if (!this.misPubsMode) {
      this.buildForm();
      //LLAMO AL SERVICIO PARA OBTENER TODAS LAS PUBLICACIONES
      this.getAllPubs();
      this.filteredOptions = this.form.controls.idCiudad.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const nombre = typeof value === 'string' ? value : value?.nombre;
          return nombre
            ? this._filter(nombre as string)
            : this.ciudades?.slice();
        })
      );
      this.onFiltroChange();
    }
  }

  /**
   * Función que emite el evento de recargar la lista de publicaciones
   */
  recargar() {
    this.recargarLista.emit(true);
  }

  /**
   * Función para obtener los tipos de mascota
   */
  getTiposMascota() {
    this.tiposMascota = this.servicePub.getTiposMascota();
  }

  /**
   * Función para obtener los tipos de mascota
   */
  getCiudades() {
    this.servicePub.getCiudades().subscribe((res) => {
      this.ciudades = res;
    });
  }

  /**
   * Función para obtener todas las publicaciones
   */
  getAllPubs() {
    this.publicaciones = this.servicePub.getAllPublicaciones();
  }

  /**
   * Función para obtener las publicaciones filtradas por tipo mascota/ciudad
   */
  getPubsFiltradas(idCiudad: number, idTipoMascota: number) {
    this.publicaciones = this.servicePub.getFilteredPubs(
      idCiudad,
      idTipoMascota
    );
  }

  /**
   * Función que escucha los cambios en los campos de filtro
   * */
  onFiltroChange() {
    this.form.controls.idTipoMascota.valueChanges.subscribe((value) => {
      if (value != null) {
        const ciudad = this.form.controls.idCiudad.value;
        this.getPubsFiltradas(ciudad?.id, value);
      }
    });
    this.form.controls.idCiudad.valueChanges.subscribe((value) => {
      if (value != null) {
        //LLAMO AL SERVICIO PARA FILTRAR Y OBTENER LAS PUBS
        this.getPubsFiltradas(value.id, this.form.controls.idTipoMascota.value);
      }
    });
  }

  /**
   * Función que se ejecuta para crear el formulario de filtro por ciudad o tipo de animal
   * */
  buildForm() {
    this.form = this.fb.group({
      idCiudad: [],
      idTipoMascota: [],
    });
  }

  /**
   *Funciones para realizar el filtro de ciudades
   */
  displayFn(ciudad: CiudadModel): string {
    return ciudad && ciudad.nombre ? ciudad.nombre : '';
  }

  private _filter(nombre: string): CiudadModel[] {
    const filterValue = nombre.toLowerCase();

    return this.ciudades.filter((ciudad) =>
      ciudad.nombre.toLowerCase().includes(filterValue)
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
