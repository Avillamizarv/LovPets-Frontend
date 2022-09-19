import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

const COMPONENTS = [
  CommonModule,
  MatButtonModule,
  MatRippleModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatRadioModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatTabsModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatStepperModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  ReactiveFormsModule,
  FormsModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatMenuModule,
];

@NgModule({
  declarations: [],
  imports: COMPONENTS,
  exports: [...COMPONENTS],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class MaterialModule {}
