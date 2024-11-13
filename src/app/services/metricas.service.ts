import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Metricas } from '../models/metricas';
import { environment } from '../../environments/environment';
import { MetricaIngresoTotalDTO } from '../models/MetricaIngresoTotalDTO';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class MetricasService {
  private url = `${base_url}/metricas`; 
  private listaCambio= new Subject<Metricas[]>

  constructor(private http: HttpClient) { }

  list(): Observable<Metricas[]> {
    return this.http.get<Metricas[]>(this.url);
  }

  insert(con:Metricas): Observable<any> {
    return this.http.post(this.url,con)
  }
  setList(listaNueva:Metricas[]){
    this.listaCambio.next(listaNueva)
  }

  getList(){
    return this.listaCambio.asObservable()
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getlistid(id: number) {
    return this.http.get<Metricas>(`${this.url}/${id}`);
  }

  update(r: Metricas) {
    return this.http.put(this.url, r);
  }

  obtenerIngresosTotal(): Observable<MetricaIngresoTotalDTO[]> {
    return this.http.get<MetricaIngresoTotalDTO[]>(`${this.url}/metricaingresototal`);
  }
}
