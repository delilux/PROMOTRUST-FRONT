import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Metricas } from '../models/metricas';
import { environment } from '../../environments/environment';

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

  getList(){
    return this.listaCambio.asObservable()
  }
}
