import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MetodoPago } from '../models/metodopago';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {
  private url = `${base_url}/metodopago`; 

  constructor(private http: HttpClient) { }

  list(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.url);
  }
}
