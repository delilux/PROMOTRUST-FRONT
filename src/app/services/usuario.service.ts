import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable, Subject } from 'rxjs';
import { UsuarioContratoActivoDTO } from '../models/UsuarioContratoActivoDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listacambio = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Usuario[]>(this.url)
  }
  insert(us: Usuario) {
    return this.http.post(this.url, us);
  }
  setList(listaNueva: Usuario[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable()
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id:number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }
  getCategoria(): Observable<UsuarioContratoActivoDTO[]> {
    return this.http.get<UsuarioContratoActivoDTO[]>(
      `${this.url}/categoria`
    );
  }


  
}
