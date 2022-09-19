export interface PublicacionAdopcionModel {
  //campos propios
  id: number;
  idUsuario: number;
  nombre: string;
  imagenB64: string;
  edad: number;
  unidadEdad: string;
  idTipoMascota: number;
  genero: string;
  raza: string;
  gustos: string;
  observaciones: string;

  //campos derivados de las foráneas
  nombreUsuario: string;
  direccionUsuario: string;
  nombreCiudadUsuario: string;
  telefonoUsuario: string;
  correoUsuario: string;
}
