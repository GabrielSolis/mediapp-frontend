import { MatPaginatorImpl } from './../_shared/mat-paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule, MatAutocompleteModule, MatNativeDateModule, MatExpansionModule, MatListModule, MatDatepickerModule, MatSelectModule, MatDialogModule, MatSnackBarModule, MatCardModule, MatInputModule, MatButtonModule, MatIconModule, MatMenuModule, MatSidenavModule, MatDividerModule, MatToolbarModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule, MatPaginatorIntl } from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatListModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatListModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MatPaginatorImpl },
  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  declarations: []
})
export class MaterialModule { }
