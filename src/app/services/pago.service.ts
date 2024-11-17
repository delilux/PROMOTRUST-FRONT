import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Pago } from '../models/pago';
import { ObtenerMontoTotalPagosPorContratoDTO } from '../models/obtenerMontoTotalPagosPorContratoDTO';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private url = `${base_url}/pago`; 
  private listacambio = new Subject<Pago[]>();
  constructor(private http: HttpClient) { }

  list(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.url);
  }
  insert(eu: Pago) {
    return this.http.post(this.url, eu);
  }
  setList(listaNueva: Pago[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id:number){
    return this.http.get<Pago>(`${this.url}/${id}`)
  }
  update(eu: Pago){
    return this.http.put(this.url, eu);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getobtenerMontoTotalPagosPorContrato():Observable<ObtenerMontoTotalPagosPorContratoDTO[]>{
    return this.http.get<ObtenerMontoTotalPagosPorContratoDTO[]>(
      `${this.url}/obtenerMontoTotalPagosPorContrato`
    );
  }
}
