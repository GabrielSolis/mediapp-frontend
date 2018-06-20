import { DialogoComponent } from './dialogo/dialogo.component';
import { MedicoService } from './../../_service/medico.service';
import { Medico } from './../../_model/medico';
import { Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-medico',
  styleUrls: ['medico.component.css'],
  templateUrl: 'medico.component.html',
})
export class MedicoComponent implements OnInit {
  medicos: Medico[] = [];
  displayedColumns = ['idmedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  dataSource: MatTableDataSource<Medico>;
  mensaje: string;
  medico: Medico;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private medicoService: MedicoService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    
  }

  ngOnInit() {
    this.medicoService.medicosCambio.subscribe(data => {
      this.medicos = data;
      this.dataSource = new MatTableDataSource(this.medicos);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.medicoService.mensaje.subscribe(data => {
      console.log(data);
      this.snackBar.open(data, null, { duration: 2000 });
    });

    this.medicoService.getlistarMedicos().subscribe(data => {
      this.medicos = data;

      this.dataSource = new MatTableDataSource(this.medicos);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  openDialog(medico: Medico): void {

    let med = medico != null ? medico : new Medico();
    let dialogRef = this.dialog.open(DialogoComponent, {
      width: '250px',   
      disableClose: true,   
      /*      data: { nombres: med.nombres , apellidos: med.apellidos, cmp: med.cmp }*/
      data: med      
    });
  }
  eliminar(medico: Medico): void {
    this.medicoService.eliminar(medico).subscribe(data => {
      if (data === 1) {
        this.medicoService.getlistarMedicos().subscribe(medicos => {
          this.medicoService.medicosCambio.next(medicos);
          this.medicoService.mensaje.next("Se elimino correctamente");
        });
      } else {
        this.medicoService.mensaje.next("No se pudo eliminar");
      }
    });
  }
}

