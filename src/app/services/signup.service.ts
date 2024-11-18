import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Signup } from '../models/signup';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private url = `${base_url}/usuarios`;
  private listacambio = new Subject<Signup[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Signup[]>(this.url);
  }

  insert(us: Signup) {
    return this.http.post(this.url, us);
  }

  update(us: Signup) {
    return this.http.put(`${this.url}/${us.id}`, us);
  }

  setList(listaNueva: Signup[]) {
    this.listacambio.next(listaNueva);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Signup>(`${this.url}/${id}`);
  }
}
