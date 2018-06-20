import { EspecialidadService } from './../../_service/especialidad.service';
import { Especialidad } from './../../_model/especialidad';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  displayedColumns = ['id', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Especialidad>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  mensaje: string;

  constructor(private especialidadService: EspecialidadService, public route: ActivatedRoute, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.especialidadService.especialidadCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.especialidadService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, {
        duration: 2000,
      });
    });

    this.especialidadService.getlistarEspecialidad().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  eliminar(especialidad: Especialidad): void {
    this.especialidadService.eliminar(especialidad).subscribe(data => {
      if (data === 1) {
        this.especialidadService.getlistarEspecialidad().subscribe(data => {
          this.especialidadService.especialidadCambio.next(data);
          this.especialidadService.mensaje.next("Se elimino correctamente");
        });
      } else {
        this.especialidadService.mensaje.next("No se pudo eliminar");
      }
    });
  }
}
