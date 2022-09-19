import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  {
    path: 'lovPets',
    component: MainPageComponent,
  },
  {
    path: 'crud-dialog',
    loadChildren: () =>
      import('./common/components/crud-dialog/crud-dialog.module').then(
        (m) => m.CrudDialogModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
