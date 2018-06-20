import { HOST, TOKEN_NAME } from './../_shared/var.constant';
import { Paciente } from './../_model/paciente';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PacienteService {

  url: string = `${HOST}/paciente`;
  pacienteCambio = new Subject<Paciente[]>();
  mensaje = new Subject<string>();
  
  //pacientes: Paciente[] = [];

  constructor(private http: HttpClient) {
    /*let p = new Paciente();
    p.idPaciente = 1;
    p.nombres = "Mito";
    p.apellidos = "Code";
    this.pacientes.push(p);

    p = new Paciente();
    p.idPaciente = 2;
    p.nombres = "Jaime";
    p.apellidos = "Medina";
    this.pacientes.push(p);*/
  }

  getlistar() {        
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Paciente[]>(`${this.url}/listar`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });    
  }

  getlistarPaciente(p: number, s: number) {
    //return this.pacientes;
    //Observable
    //return this.http.get<Paciente[]>(`${this.url}/listar`);
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Paciente[]>(`${this.url}/listarPageable?page=${p}&size=${s}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
    //http://localhost:8080/paciente/listarPageable?page=1&size=10
  }

  getPacientePorId(id: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Paciente>(`${this.url}/listar/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }


  registrar(paciente: Paciente) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(`${this.url}/registrar`, paciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(paciente: Paciente) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(`${this.url}/actualizar`, paciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(paciente: Paciente) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/eliminar/${paciente.idPaciente}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
