import { FormGroup } from '@angular/forms';
import { TOKEN_NAME } from './../_shared/var.constant';
import { LoginService } from './../_service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as decode from 'jwt-decode';
import '../login-animation.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  contrasena: string;
  form: FormGroup;

  mensaje: string;
  error: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

  iniciarSesion() {
    this.loginService.login(this.usuario, this.contrasena).subscribe(data => {
      //console.log(data);
      if (data) {
        let token = JSON.stringify(data);
        sessionStorage.setItem(TOKEN_NAME, token);

        let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
        const decodedToken = decode(tk.access_token);
        //console.log(decodedToken);
        let rol = decodedToken.authorities[0];

        if (rol === 'ROLE_ADMIN') {
          this.router.navigate(['consulta']);
        } else {
          this.router.navigate(['paciente']);
        }
      }
    }, (err) => {
      if (err.status !== 401) {
        this.error = "Error de conexión";
      }
      if (err.status === 401 || err.status === 400) {
        this.error = "Credenciales incorrectas";
      }
    });
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
