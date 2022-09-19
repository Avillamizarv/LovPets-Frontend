export interface SolicitudAdopcionModel {
  //Campos propios
  id: number;
  idUsuario: number;
  idPublicacion: number;
  otrasMascotas: boolean;
  mascotas: string;
  condiciones: string;
  fechaRegistro: Date;
  estado: number;
  //Campos que provienen de foráneas
  nombreUsuario: string;
  direccionUsuario: string;
  nombreCiudadUsuario: string;
  telefonoUsuario: string;
  correoUsuario: string;
  nombreMascota: string;
  nombreUsuarioPublicacion: string;
  telefonoUsuarioPublicacion: string;
  correoUsuarioPublicacion: string;
  imagenB64: string;
}
