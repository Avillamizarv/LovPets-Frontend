import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CrudDialogComponent } from './crud-dialog.component';
import { CrudService } from '../../services/crud.service';
import { AdDirective } from '../../directives/ad-component.directive';


@NgModule({
  declarations: [CrudDialogComponent, AdDirective],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [CrudService],
  exports: [CrudDialogComponent],
})
export class CrudDialogModule {}
