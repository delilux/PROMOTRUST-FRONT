import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ContratoUsuario } from '../models/contratousuario';
import { environment } from '../../environments/environment';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})

export class ContratousuarioService {
  private url = `${base_url}/contratousuario`; 
  private listaCambio= new Subject<ContratoUsuario[]>

  constructor(private http: HttpClient) { }

  list(): Observable<ContratoUsuario[]> {
    return this.http.get<ContratoUsuario[]>(this.url);
  }

  getList(){
    return this.listaCambio.asObservable()
  }

  insert(con:ContratoUsuario){
    return this.http.post(this.url,con)
  }

  setList(listaNueva:ContratoUsuario[]){
    this.listaCambio.next(listaNueva)
  }
}
