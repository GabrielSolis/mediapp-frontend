import { Injectable } from '@angular/core';
import { HOST, TOKEN_NAME } from '../_shared/var.constant';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signos } from '../_model/signos';

@Injectable()
export class SignosService {
  url : string =`${HOST}/signos`;
  mensaje = new Subject<string>();
  signosCambio = new Subject<Signos[]>();
  
  constructor(private http: HttpClient) { }

  getListar(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Signos[]>(`${this.url}/listar`,{
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  getSignosPorFechaPageable(fecha :String , p:number , s:number){
      let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
      return this.http.get<Signos[]>(`${this.url}/listarPageable/fecha/${fecha}/?page=${p}&size=${s}`,{
        headers : new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
      });
  }

  getSignosPorFecha(fecha :String){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Signos[]>(`${this.url}/listar/fecha/${fecha}`,{
      headers : new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
}

  getSignosPorId(id: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Signos>(`${this.url}/listar/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(signos: Signos) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(`${this.url}/registrar`, signos, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(signos : Signos) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(`${this.url}/actualizar`, signos, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(codigoSignos : number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/eliminar/${codigoSignos}`,{
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
