import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preguntas } from '../models/preguntas';
import { Subject } from 'rxjs';

const base_url = environment.base;
@Injectable({

  providedIn: 'root'
})
export class PreguntasService {

  private url = `${base_url}/preguntas`;

  private listaCambio=new Subject<Preguntas[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Preguntas[]>(this.url)
  }
  insert(ro:Preguntas){
    return this.http.post(this.url,ro);
  }
  setList(listaNueva:Preguntas[]){
    this.listaCambio.next(listaNueva)
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Preguntas>(`${this.url}/${id}`);
  }

  update(r: Preguntas) {
    return this.http.put(this.url, r);
  }
   
}
 

