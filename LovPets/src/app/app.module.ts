import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewPublicacionesComponent } from './components/view-publicaciones/view-publicaciones.component';
import { FormPublicacionAdopcionComponent } from './components/form-publicacion-adopcion/form-publicacion-adopcion.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { CommonModule } from '@angular/common';
import { SelectorArchivosModule } from './common/components/selector-archivos/selector-archivos.module';
import { FormSolicitudAdopcionComponent } from './components/form-solicitud-adopcion/form-solicitud-adopcion.component';
import { NotRegisteredErrorComponent } from './components/not-registered-error/not-registered-error.component';
import { ViewMisSolicitudesComponent } from './components/view-mis-solicitudes/view-mis-solicitudes.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ViewPublicacionesComponent,
    FormPublicacionAdopcionComponent,
    SafeUrlPipe,
    FormSolicitudAdopcionComponent,
    NotRegisteredErrorComponent,
    ViewMisSolicitudesComponent,
    FormUsuarioComponent,
    InicioSesionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    CoreModule,
    MatDialogModule,
    CommonModule,
    SelectorArchivosModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
