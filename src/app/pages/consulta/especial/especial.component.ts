import { ConsultaListaExamen } from './../../../_model/consultaListaExamen';
import { ConsultaService } from './../../../_service/consulta.service';
import { ExamenService } from './../../../_service/examen.service';
import { MedicoService } from './../../../_service/medico.service';
import { PacienteService } from './../../../_service/paciente.service';
import { EspecialidadService } from './../../../_service/especialidad.service';
import { DetalleConsulta } from './../../../_model/detalleConsulta';
import { Examen } from './../../../_model/examen';
import { Consulta } from './../../../_model/consulta';
import { Medico } from './../../../_model/medico';
import { Especialidad } from './../../../_model/especialidad';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Paciente } from '../../../_model/paciente';

@Component({
  selector: 'app-especial',
  templateUrl: './especial.component.html',
  styleUrls: ['./especial.component.css']
})
export class EspecialComponent implements OnInit {

  myControl: FormControl = new FormControl();
  myControlMedico: FormControl = new FormControl();

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];  
  consulta: Consulta;
  examenes: Examen[] = [];

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];
  diagnostico: string;
  tratamiento: string;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date()

  mensaje: string;

  filteredOptions: Observable<any[]>;
  filteredOptionsMedico: Observable<any[]>;
  
  pacienteSeleccionado: Paciente;
  medicoSeleccionado: Medico;
  especialidadSeleccionada: Especialidad;
  examenSeleccionado: Examen;

  constructor(private especialidadService: EspecialidadService, private consultaService: ConsultaService,
    private pacienteService: PacienteService, private medicoService: MedicoService, private examenService: ExamenService,
    public snackBar: MatSnackBar) {    
  }

  ngOnInit() {
    this.listarPacientes();
    this.listarEspecilidad();
    this.listarMedicos();
    this.listarExamenes();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(null),
        map(val => this.filter(val))
      );

    this.filteredOptionsMedico = this.myControlMedico.valueChanges
      .pipe(
        startWith(null),
        map(val => this.filterMedico(val))
      );
  }

  filter(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dni.includes(val.dni));
    } else {      
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.includes(val));
    }
  }

  filterMedico(val: any) {
    if (val != null && val.idMedico > 0) {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.cmp.includes(val.cmp));
    } else {
      return this.medicos.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.cmp.includes(val));
    }
  }  

  displayFn(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  displayFnMedico(val: Medico) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  seleccionarPaciente(e) {
    this.pacienteSeleccionado = e.option.value;
  }

  seleccionarMedico(e) {
    this.medicoSeleccionado = e.option.value;
  }

  listarPacientes() {
    this.pacienteService.getlistar().subscribe(data => {
      this.pacientes = data;
    });
  }

  listarEspecilidad() {
    this.especialidadService.getlistarEspecialidad().subscribe(data => {
      this.especialidades = data;
    })
  }

  listarMedicos() {
    this.medicoService.getlistarMedicos().subscribe(data => {
      this.medicos = data;
    })
  }
  listarExamenes() {
    this.examenService.getlistarExamen().subscribe(data => {
      this.examenes = data;
    })
  }

  agregar() {

    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = `Debe agregar un diagnóstico y tramiento`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  agregarExamen() {
    if (this.examenSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.examenSeleccionado.idExamen) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = `El examen se encuentra en la lista`;
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        this.examenesSeleccionados.push(this.examenSeleccionado);
      }
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  aceptar() {    
    this.consulta = new Consulta();
    this.consulta.especialidad = this.especialidadSeleccionada;
    this.consulta.paciente = this.pacienteSeleccionado;
    this.consulta.medico = this.medicoSeleccionado;
    this.consulta.detalleConsulta = this.detalleConsulta;
    this.consulta.fecha = this.fechaSeleccionada;

    let consultaListaExamen = new ConsultaListaExamen();
    consultaListaExamen.consulta = this.consulta;
    consultaListaExamen.lstExamen = this.examenesSeleccionados;

    console.log(consultaListaExamen);

    this.consultaService.registrar(consultaListaExamen).subscribe(data => {

      console.log(data);

      if (data) {
        this.snackBar.open("Se registró", "Aviso", { duration: 2000 });
      } else {
        this.snackBar.open("Error al registrar", "Aviso", { duration: 2000 });
      }
    });

    setTimeout(() => {
      this.limpiarControles();
    }, 2000);
  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.pacienteSeleccionado = null;
    this.especialidadSeleccionada = null;
    this.medicoSeleccionado = null;
    this.examenSeleccionado = null;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
    this.consulta = new Consulta();
  }

  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }
  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.especialidadSeleccionada === null || this.medicoSeleccionado === null || this.pacienteSeleccionado === null);
  }  
}
