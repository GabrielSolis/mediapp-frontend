import { Component, OnInit } from '@angular/core';
import { TOKEN_NAME } from '../../_shared/var.constant';
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario :string;
  authority : string;


  constructor() { }

  ngOnInit() {
    let token = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
    const decodedToken = decode(token.access_token);
    this.usuario = decodedToken.user_name;
    
    if(decodedToken.authorities[0] === 'ROLE_ADMIN'){
      this.authority = "Administrador";
    }else{
      this.authority = "Operador"
    }
    console.log(decodedToken);
  }

}
