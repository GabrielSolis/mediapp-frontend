import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST, TOKEN_AUTH_USERNAME, TOKEN_AUTH_PASSWORD, TOKEN_NAME } from './../_shared/var.constant';
import * as decode from 'jwt-decode';

@Injectable()
export class LoginService {

  url: string = `${HOST}/oauth/token`;  
  //url: string = `${HOST}/${MICRO_AUTH}/oauth/token`;  

  constructor(private http: HttpClient, private router: Router) {
  }

  login(usuario: string, contrasena: string) {
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(contrasena)}`;

    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD))
    });
    //return true;
  }

  estaLogeado() {
    let token = sessionStorage.getItem(TOKEN_NAME);
    return token != null;
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  isAdmin(){
    let tk = sessionStorage.getItem(TOKEN_NAME);        
    if (tk != null) {      
      const decodedToken = decode(tk);
      //console.log(decodedToken);
      let isAdmin = decodedToken.authorities.some(el => el === 'ROLE_ADMIN');
      //console.log(isAdmin);
      return isAdmin;      
    }
  }

  enviarCorreo(correo: string) {        
    return this.http.post<number>(`${HOST}/login/enviarCorreo`, correo, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

  verificarTokenReset(token: string) {  
    return this.http.get<number>(`${HOST}/login/restablecer/verificar/${token}`);
  }

  restablecer(token: string, clave: string) {
    return this.http.post<number>(`${HOST}/login/restablecer/${token}`, clave, {
      headers: new HttpHeaders().set('Content-Type', 'text/plain')
    });
  }

}
