import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContratoUsuario } from '../models/contratousuario';
import { environment } from '../../environments/environment';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})

export class ContratousuarioService {
  private url = `${base_url}/contratousuario`; 

  constructor(private http: HttpClient) { }

  list(): Observable<ContratoUsuario[]> {
    return this.http.get<ContratoUsuario[]>(this.url);
  }
}
