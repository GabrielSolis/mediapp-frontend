import { ConsultaService } from './_service/consulta.service';
import { ExamenService } from './_service/examen.service';
import { MedicoService } from './_service/medico.service';
import { GuardService } from './_service/guard.service';
import { LoginService } from './_service/login.service';
import { PacienteService } from './_service/paciente.service';
import {SignosService} from './_service/signos.service';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { EspecialidadService } from './_service/especialidad.service';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { DialogoComponent } from './pages/medico/dialogo/dialogo.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { BuscarComponent } from './pages/consulta/buscar/buscar.component';
import { DialogoDetalleComponent } from './pages/consulta/buscar/dialogo-detalle/dialogo-detalle.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { Not403Component } from './pages/not403/not403.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReporteComponent } from './pages/reporte/reporte.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { TokenComponent } from './login/recuperar/token/token.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SignosComponent } from './pages/signos/signos.component';
import { RegistrarSignosComponent } from './pages/signos/registrar-signos/registrar-signos.component';
import { DialogoEliminarComponent } from './pages/signos/dialogo-eliminar/dialogo-eliminar.component';


@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    LoginComponent,
    EspecialidadComponent,
    EspecialidadEdicionComponent,
    ExamenComponent,
    ExamenEdicionComponent,
    MedicoComponent,
    DialogoComponent,
    ConsultaComponent,
    BuscarComponent,
    DialogoDetalleComponent,
    EspecialComponent,
    Not403Component,
    ReporteComponent,
    RecuperarComponent,
    TokenComponent,
    PerfilComponent,
    SignosComponent,
    RegistrarSignosComponent,
    DialogoEliminarComponent
  ],
  entryComponents: [DialogoComponent, DialogoDetalleComponent,PacienteEdicionComponent,DialogoEliminarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  providers: [PacienteService, LoginService, MedicoService, ExamenService, EspecialidadService, ConsultaService, GuardService,SignosService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
