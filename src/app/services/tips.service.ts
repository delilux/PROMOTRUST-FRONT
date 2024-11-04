import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Tips } from '../models/Tips';

const base_url = environment.base
@Injectable({
    providedIn:'root'
})
export class TipsService{
    private url=`${base_url}/tips`;
    private listacambio = new Subject<Tips[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Tips[]>(this.url)
  }
  insert(ro:Tips){
    return this.http.post(this.url,ro);
  }
  setList(listaNueva:Tips[]){
    this.listacambio.next(listaNueva)
  }
  getList(){
    return this.listacambio.asObservable();
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Tips>(`${this.url}/${id}`);
  }

  update(r: Tips) {
    return this.http.put(this.url, r);
  }
}