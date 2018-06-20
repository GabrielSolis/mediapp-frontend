import { ConsultaResumen } from './../_model/consultaResumen';
import { FiltroConsulta } from './../_model/filtroConsulta';
import { ConsultaListaExamen } from './../_model/consultaListaExamen';
import { Consulta } from './../_model/consulta';
import { HOST, TOKEN_NAME } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConsultaService {

  //private url: string = `${HOST}/${MICRO_CR}/consulta`;
  private url: string = `${HOST}/consulta`;

  constructor(private http: HttpClient) { }

  registrar(consulta: ConsultaListaExamen) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<number>(`${this.url}/registrar`, consulta, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  buscar(filtroConsulta: FiltroConsulta) {    
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarResumen() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<ConsultaResumen[]>(`${this.url}/listarResumen`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  generarReporte() {    
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get(`${this.url}/generarReporte`, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  guardarArchivo(data: File) {    
    let formdata: FormData = new FormData();
    formdata.append('file', data);

    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    
    return this.http.post(`${this.url}/guardarArchivo`, formdata, {
      responseType: 'text',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
    });
  }

  leerArchivo() {    
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get(`${this.url}/leerArchivo/6`, {
      responseType: 'blob',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
