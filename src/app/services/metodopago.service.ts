import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MetodoPago } from '../models/metodopago';
import { ObtenerPagosPorMetodoPagoDTO } from '../models/obtenerPagosPorMetodoPagoDTO';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {
  private url = `${base_url}/metodopago`; 
  private listacambio = new Subject<MetodoPago[]>();
  constructor(private http: HttpClient) { }

  list(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.url);
  }
  insert(mP: MetodoPago) {
    return this.http.post(this.url, mP);
  }
  setList(listaNueva: MetodoPago[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<MetodoPago>(`${this.url}/${id}`)
  }
  update(mP: MetodoPago){
    return this.http.put(this.url, mP);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getobtenerMontoTotalPagosPorContrato():Observable<ObtenerPagosPorMetodoPagoDTO[]>{
    return this.http.get<ObtenerPagosPorMetodoPagoDTO[]>(
      `${this.url}/obtenerPagosPorMetodoPago`
    );
  }
  /*
  getEventosxVenir(): Observable<EventosxVenirDTO[]> {
    return this.http.get<EventosxVenirDTO[]>(
      `${this.url}/eventosproximos`
    );
  }
  getEventosPasados(): Observable<CantEventosPasadosByTeDTO[]> {
    return this.http.get<CantEventosPasadosByTeDTO[]>(
      `${this.url}/eventospasados`
    );
  }
    */
}
