import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Paciente } from '../../../_model/paciente';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { PacienteService } from '../../../_service/paciente.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SignosService } from '../../../_service/signos.service';
import { Signos } from '../../../_model/signos';
import { MatDialog } from '@angular/material';
import { PacienteEdicionComponent } from '../../paciente/paciente-edicion/paciente-edicion.component';

@Component({
  selector: 'app-registrar-signos',
  templateUrl: './registrar-signos.component.html',
  styleUrls: ['./registrar-signos.component.css']
})
export class RegistrarSignosComponent implements OnInit {
  apellidoPacienteControl : FormControl = new FormControl();
  pacientes : Paciente[];
  filteredOptions: Observable<Paciente[]>;
  id : number;
  signos : Signos;
  form : FormGroup;
  edicion : boolean = false;
  paciente : Paciente;
  maxFecha = new Date();
  

  constructor(private signosService: SignosService,private pacienteService: PacienteService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) { 
    this.signos = new Signos();
    this.form = new FormGroup({
    'id': new FormControl(0),
    'temperatura': new FormControl(),
    'pulso': new FormControl(),
    'ritmo': new FormControl(),
    'fechaSignos' : new FormControl(this.maxFecha),
    'paciente' : new FormControl()
    });
   
  }

  ngOnInit() {
    console.log("hola")
    this.route.params.subscribe((params:Params)=>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });


    this.pacienteService.getlistar().subscribe(data =>{
        this.pacientes = data;//JSON.parse(JSON.stringify(data)).content;
        this.filteredOptions = this.apellidoPacienteControl.valueChanges
        .pipe(
          startWith<string | Paciente>(''),
          map(value => typeof value === 'string' ? value : value.apellidos),
          map(name => name ? this.filter(name) : this.pacientes.slice())
        );
    });

    this.pacienteService.pacienteCambio.subscribe(data=>{
      this.pacientes = data;//JSON.parse(JSON.stringify(data)).content;
      this.filteredOptions = this.apellidoPacienteControl.valueChanges
      .pipe(
        startWith<string | Paciente>(''),
        map(value => typeof value === 'string' ? value : value.apellidos),
        map(name => name ? this.filter(name) : this.pacientes.slice())
      );
    });
   
  }
  private initForm(){
    if(this.edicion){
    this.signosService.getSignosPorId(this.id).subscribe(data =>{
      let id = data.codigoSignos;
      let pulso = data.pulso;
      let ritmoRespiratorio = data.ritmoRespiratorio;
      let temperatura = data.temperatura;
      let fecha = data.fecha;
      this.paciente = data.paciente;
        this.form = new FormGroup({
          'id' : new FormControl(id),
          'temperatura' : new FormControl(temperatura),
          'pulso' : new FormControl(pulso),
          'ritmo' : new FormControl(ritmoRespiratorio),
          'fechaSignos' : new FormControl(fecha),
          'paciente' : new FormControl(this.paciente.nombres +" " +this.paciente.apellidos)
        });
      
      });
    }
  }

  registrarEditar(){
    this.signos.codigoSignos = this.form.value['id'];
 
    this.signos.fecha = this.form.value['fechaSignos'];
    this.signos.pulso = this.form.value['pulso'];
    this.signos.ritmoRespiratorio = this.form.value['ritmo'];
    this.signos.temperatura = this.form.value['temperatura'];
    if(this.edicion){ 
      this.signos.paciente = this.paciente;
      this.signosService.modificar(this.signos).subscribe(data =>{
        if(data ==1){
          this.signosService.getSignosPorFechaPageable(this.convertirFecha(this.signos.fecha),0,10).subscribe(signos =>{
            this.signosService.signosCambio.next(signos);
            this.signosService.mensaje.next('Se actulizaron los signos');
          })
        }else{
          this.signosService.mensaje.next('No se actualizaron los signos');
        }
      });
    }else{
      this.signos.paciente = this.apellidoPacienteControl.value;
      this.signosService.registrar(this.signos).subscribe(data =>{
        if(data ==1){
          this.signosService.mensaje.next('Se registro');
        }else{
          this.signosService.mensaje.next('No se registro');
        }
      });
      
    }
    this.router.navigate(['signos'])
  }
  
  filter(apellidos: string): Paciente[] {
    return this.pacientes.filter(paciente =>
      paciente.apellidos.toLowerCase().indexOf(apellidos.toLowerCase()) === 0);
  }

  displayFn(paciente ?: Paciente): string | undefined {
    return paciente ? (paciente.nombres + " " + paciente.apellidos) : undefined;
   
  }
    convertirFecha(fecha: Date){
    let cadena ="";
    cadena = fecha.getFullYear() + "-" + (((fecha.getMonth()+1)< 10) ? ("0"+(fecha.getMonth()+1)) : (fecha.getMonth()+1)) + "-" +
    ((fecha.getDate()< 10) ? ("0"+fecha.getDate()) : fecha.getDate()) + " 00:00:00";
    console.log(fecha.getFullYear + "-" + fecha.getMonth()+"-"+fecha.getDate());
    return cadena;
  }

  agregarPaciente(){
    let dialogRef = this.dialog.open(PacienteEdicionComponent,{
      width:'800 px',
      data : true
    });
  }
  
}
