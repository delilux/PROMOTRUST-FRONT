import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Evaluacion } from '../models/evaluacion';
import { Subject } from 'rxjs';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})

export class EvaluacionService {
  private url = `${base_url}/evaluacion`; 

 
  private listaCambio= new Subject<Evaluacion[]>
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Evaluacion[]>(this.url);
  }
  insert(ro: Evaluacion) {
    return this.http.post(this.url, ro);
  }
  setList(listaNueva:Evaluacion[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
    return this.listaCambio.asObservable()
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Evaluacion>(`${this.url}/${id}`);
  }

  update(r: Evaluacion) {
    return this.http.put(this.url, r);
  }

}