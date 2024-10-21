import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrato } from '../models/contrato';
import { environment } from '../../environments/environment';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})

export class ContratoService {
  private url = `${base_url}/contrato`; 

  constructor(private http: HttpClient) { }

  list(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.url);
  }
}