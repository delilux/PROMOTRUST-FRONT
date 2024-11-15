import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Incidencias } from '../models/incidencias';
 import { Subject } from 'rxjs';
 import { Observable } from 'rxjs';
import { IncidenciasControllerDTO } from '../models/IncidenciasControllerDTO';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private url = `${base_url}/incidencias`; 

  private listaCambio=new Subject<Incidencias[]>();


  constructor(private http: HttpClient) { }
  list():Observable<Incidencias[]>{
    return this.http.get<Incidencias[]>(this.url)
  }
  insert(ro:Incidencias){
    return this.http.post(this.url,ro);
  }
  setList(listaNueva:Incidencias[]){
    this.listaCambio.next(listaNueva)
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Incidencias>(`${this.url}/${id}`);
  }

  update(r: Incidencias) {
    return this.http.put(this.url, r);
  }

    // Cambiar a IncidenciasControllerDTO[] si el backend ya devuelve los datos en ese formato
    IncidenciasporContrato(): Observable<IncidenciasControllerDTO[]> {
      return this.http.get<IncidenciasControllerDTO[]>(`${this.url}/incidencias_contrato`);
    }

}
