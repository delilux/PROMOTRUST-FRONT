import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Servicios } from '../models/servicios';

const base_url = environment.base;
@Injectable({

  providedIn: 'root'
})
export class ServiciosService {

  private url = `${base_url}/servicio`;
  private listaCambio=new Subject<Servicios[]>();
  
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Servicios[]>(this.url);
  }

  insert(ro: Servicios) {
    return this.http.post(this.url, ro);
  }

  setList(listaNueva: Servicios[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Servicios>(`${this.url}/${id}`);
  }

  update(r: Servicios) {
    return this.http.put(this.url, r);
  }
}