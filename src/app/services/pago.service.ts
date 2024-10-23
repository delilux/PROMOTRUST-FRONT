import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url = `${base_url}/pago`; 

  constructor(private http: HttpClient) { }

  list(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.url);
  }
}
