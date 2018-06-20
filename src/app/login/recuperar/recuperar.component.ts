import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_service/login.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {

  email: string;
  mensaje: string;
  error: string;
  porcentaje: number = 0;

  constructor(private loginService: LoginService, public route: ActivatedRoute) { }

  ngOnInit() {
  }

  enviar() {
    this.porcentaje = 99;
    this.loginService.enviarCorreo(this.email).subscribe(data => {
      if (data === 1) {
        this.mensaje = "Se enviaron las indicaciones al correo."
        this.error = null
        this.porcentaje = 100;
      } else {
        this.error = "El usuario ingresado no existe";
        this.porcentaje = 0;
      }
    }, (err => {
      this.error = "Error al enviar";
      this.porcentaje = 0;
    }));
  }

}
