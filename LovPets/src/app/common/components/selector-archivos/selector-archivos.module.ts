import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectorArchivosRoutingModule } from './selector-archivos-routing.module';
import { SelectorArchivosComponent } from './selector-archivos.component';


@NgModule({
  declarations: [
    SelectorArchivosComponent
  ],
  imports: [
    CommonModule,
    SelectorArchivosRoutingModule
  ],
  exports: [SelectorArchivosComponent],
})
export class SelectorArchivosModule { }
