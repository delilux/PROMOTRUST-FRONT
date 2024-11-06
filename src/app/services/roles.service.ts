import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/roles';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = `${base_url}/roles`;
  private listacambio = new Subject<Roles[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Roles[]>(this.url)
  }
  insert(us: Roles) {
    return this.http.post(this.url, us);
  }
  setList(listaNueva: Roles[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable()
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number) {
    return this.http.get<Roles>(`${this.url}/${id}`);
  }

  
}