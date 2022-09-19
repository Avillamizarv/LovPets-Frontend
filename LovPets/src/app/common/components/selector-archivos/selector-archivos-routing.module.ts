import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorArchivosComponent } from './selector-archivos.component';

const routes: Routes = [{ path: 'selector', component: SelectorArchivosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectorArchivosRoutingModule { }
