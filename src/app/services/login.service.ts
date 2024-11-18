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
  constructor(private http: HttpClient) {}

  _username: string = '';
  idUsuario:number=0


  setusername(value: string) {
    this._username = value;
  }
  setid(value:number){
    this.idUsuario=value
  }
  getId(){
    return this.idUsuario
  }

  getusername(): string {
    return this._username;
  }

  login(request: JwtRequest) {
    return this.http.post('https://promotrustback-fff2c4gdh7dffpb2.canadacentral-01.azurewebsites.net/login', request);
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
    return decodedToken?.role;
  }
}