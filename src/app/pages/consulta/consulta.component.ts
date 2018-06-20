import { ConsultaListaExamen } from './../../_model/consultaListaExamen';
import { ExamenService } from './../../_service/examen.service';
import { ConsultaService } from './../../_service/consulta.service';
import { MedicoService } from './../../_service/medico.service';
import { PacienteService } from './../../_service/paciente.service';
import { EspecialidadService } from './../../_service/especialidad.service';
import { DetalleConsulta } from './../../_model/detalleConsulta';
import { Examen } from './../../_model/examen';
import { Consulta } from './../../_model/consulta';
import { Medico } from './../../_model/medico';
import { Especialidad } from './../../_model/especialidad';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { MatAutocompleteSelectedEvent, MatSnackBar } from '@angular/material';
import { Paciente } from '../../_model/paciente';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  consulta: Consulta;
  examenes: Examen[] = [];

  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];
  diagnostico: string;
  tratamiento: string;
  idPacienteSeleccionado: number;
  idEspecialidadSeleccionado: number;
  idMedicoSeleccionado: number;
  idExamenSeleccionado: number;
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  mensaje: string;

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
    if (this.idExamenSeleccionado > 0) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.idExamenSeleccionado) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = `El examen se encuentra en la lista`;
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        let examen = new Examen();
        examen.idExamen = this.idExamenSeleccionado;
        this.examenService.getExamenPorId(this.idExamenSeleccionado).subscribe(data => {
          examen.nombre = data.nombre;
          this.examenesSeleccionados.push(examen);
        });
      }
    } else {
      this.mensaje = `Debe agregar un examen`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  aceptar() {
    let medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;
    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;
    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    this.consulta = new Consulta();
    this.consulta.especialidad = especialidad;
    this.consulta.paciente = paciente;
    this.consulta.medico = medico;
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
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionado = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
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
    return (this.detalleConsulta.length === 0 || this.idEspecialidadSeleccionado === 0 || this.idMedicoSeleccionado === 0 || this.idPacienteSeleccionado === 0);
  }  
}
