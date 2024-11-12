import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
import { JwtRequest } from '../models/jwtRequest';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${base_url}/usuarios`;
  private urllog = `${base_url}/login`;

  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post(this.urllog, request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
    let token = sessionStorage.getItem('token');
    if (!token) {
      // Manejar el caso en el que el token es nulo.
      return null; // O cualquier otro valor predeterminado dependiendo del contexto.
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);
    return decodedToken?.role;
  }
  /*

  */
  
}