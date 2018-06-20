import { LoginService } from './login.service';
import { TOKEN_NAME } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import * as decode from 'jwt-decode';

@Injectable()
export class GuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let rpta = this.loginService.estaLogeado();
    if (!rpta) {
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
    } else {
        let token = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
        if (tokenNotExpired(TOKEN_NAME, token.access_token)) {
            const decodedToken = decode(token.access_token);
            //console.log(decodedToken);
            let rol = decodedToken.authorities[0];

            let url = state.url;
            //console.log(rol);
            //console.log(url);

            switch (rol) {
                case 'ROLE_ADMIN': {
                    if (url === '/buscar' || url === '/consulta' || url === '/consulta-especial' || url === '/reporte' || url === '/perfil'|| url === '/signos') {
                        return true;
                    } else {
                        this.router.navigate(['not-403']);
                        return false;
                    }                    
                }
                case 'ROLE_USER': {
                    if (url === '/especialidad' || url === '/medico' || url === '/paciente' || url === '/examen' || url === '/perfil') {
                        return true;
                    } else {
                        this.router.navigate(['not-403']);
                        return false;
                    }                    
                }
                default: {
                    this.router.navigate(['not-403']);
                    return false;                    
                }
            }
        } else {
            sessionStorage.clear();
            this.router.navigate(['login']);
            return false;
        }
    }
}
}
