import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatSnackBar, MatSort, MatPaginator } from '@angular/material';
import { Signos } from '../../_model/signos';
import { SignosService } from '../../_service/signos.service';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from '../../_model/paciente';
import { DialogoEliminarComponent } from './dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-signos',
  templateUrl: './signos.component.html',
  styleUrls: ['./signos.component.css']
})
export class SignosComponent implements OnInit {
  form: FormGroup;
  displayedColumns = ['paciente','dni', 'temperatura', 'pulso', 'ritmoRespiratorio','opciones'];
  dataSource: MatTableDataSource<Signos>; 
  maxFecha: Date = new Date();
  cantidad: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private signosService: SignosService,private snackBar: MatSnackBar,public dialog: MatDialog,public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'fechaSignos': new FormControl(this.maxFecha)
    });
    
    this.signosPorFecha(0,10);

    this.signosService.signosCambio.subscribe(data =>{
      let signos = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (datos:Signos,filter:string) => (datos.paciente.dni.includes(filter)) ;
    });

    this.signosService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000 });
    });

    
  }

  buscarSignos(){
    this.signosPorFecha(0,10);
  }

  signosPorFecha(p:number , s:number){
    let fecha = this.form.value['fechaSignos'];

    this.signosService.getSignosPorFechaPageable(this.convertirFecha(fecha),p,s).subscribe(data =>{
      let signos = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;
      this.dataSource = new MatTableDataSource(signos);
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (datos:Signos,filter:string) => (datos.paciente.dni.includes(filter)) ;
    });
  }

  convertirFecha(fecha: Date){
    let cadena ="";
    cadena = fecha.getFullYear() + "-" + (((fecha.getMonth()+1)< 10) ? ("0"+(fecha.getMonth()+1)) : (fecha.getMonth()+1)) + "-" +
    ((fecha.getDate()< 10) ? ("0"+fecha.getDate()) : fecha.getDate()) + " 00:00:00";
    return cadena;
  }

  mostrarMas(e) {
    this.signosPorFecha(e.pageIndex, e.pageSize);
  }

  
  applyFilter(filterValue: string) {
    
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
   
  }
  
  eliminarSignos(signo : Signos){
    let dialogRef = this.dialog.open(DialogoEliminarComponent,{
      width:'500 px',
      data : signo
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result == 1){
        this.signosService.mensaje.next('Se eliminaron los signos vitales');
        this.signosPorFecha(0,10);
      }else{
        this.signosService.mensaje.next('Se cancelo la eliminación');
      }
    })
  }

}
