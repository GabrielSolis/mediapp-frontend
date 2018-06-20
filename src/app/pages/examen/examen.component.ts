import { ExamenService } from './../../_service/examen.service';
import { Examen } from './../../_model/examen';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mensaje: string;

  constructor(private examenService: ExamenService, public route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.examenService.examenCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.examenService.getlistarExamen().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.examenService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, {
        duration: 2000,
      });
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  eliminar(examen: Examen): void {
    this.examenService.eliminar(examen).subscribe(data => {
      if (data === 1) {
        this.examenService.getlistarExamen().subscribe(data => {
          this.examenService.examenCambio.next(data);
          this.examenService.mensaje.next("Se elimino correctamente");
        });
      } else {
        this.examenService.mensaje.next("No se pudo eliminar");
      }      
    });
  }
}
