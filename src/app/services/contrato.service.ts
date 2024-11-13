import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contrato } from '../models/contrato';
import { environment } from '../../environments/environment';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})

export class ContratoService {
  private url = `${base_url}/contrato`; 

  constructor(private http: HttpClient) { }
  private listaCambio= new Subject<Contrato[]>

  list(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.url);
  }
  insert(con:Contrato): Observable<any> {
    return this.http.post(this.url,con)
  }
  setList(listaNueva:Contrato[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
    return this.listaCambio.asObservable()
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getlistid(id: number) {
    return this.http.get<Contrato>(`${this.url}/${id}`);
  }

  update(r: Contrato) {
    return this.http.put(this.url, r);
  }

}