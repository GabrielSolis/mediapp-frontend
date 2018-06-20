import { ActivatedRoute } from '@angular/router';
import { PacienteService } from './../../_service/paciente.service';
import { Paciente } from './../../_model/paciente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  lista: Paciente[] = [];
  displayedColumns = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  dataSource: MatTableDataSource<Paciente>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private pacienteService: PacienteService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
    this.pacienteService.getlistarPaciente(0, 10).subscribe(data => {
      let pacientes = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(pacientes);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.pacienteService.pacienteCambio.subscribe(data => {
      let pacientes = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(pacientes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.pacienteService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000 });
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  mostrarMas(e) {
    //e.pageIndex e.pageSize e.length
    //console.log(e.pageIndex);
    //console.log(e.pageSize);

    this.pacienteService.getlistarPaciente(e.pageIndex, e.pageSize).subscribe(data => {
      console.log(data);
      let pacientes = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource= new MatTableDataSource(pacientes);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });
  }

}
