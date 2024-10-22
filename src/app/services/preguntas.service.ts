import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { incidencias } from '../models/incidencias';
import { Preguntas } from '../models/preguntas';

const base_url = environment.base;
@Injectable({

  providedIn: 'root'
})
export class PreguntasService {

  private url = `${base_url}/preguntas`;

  constructor(private http: HttpClient) {}

  list():Observable<Preguntas[]>{
    return this.http.get<Preguntas[]>(this.url)
  }

   
}
 

