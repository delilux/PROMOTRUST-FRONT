import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { incidencias } from '../models/incidencias';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private url = `${base_url}/incidencias`; 

  constructor(private http: HttpClient) { }
  list() {
    return this.http.get<incidencias[]>(this.url)
  }
}
