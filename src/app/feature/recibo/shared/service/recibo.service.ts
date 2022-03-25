import { Recibo } from './../model/recibo';
import { HttpService } from '@core/services/http.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReciboService {

  constructor(private http:HttpService) {}

  public listar() {
    return this.http.doGet<Recibo[]>(`${environment.endpoint}/recibos`, this.http.optsName('listar recibos'));
  }

  public crear(recibo:Recibo) {
    return this.http.doPost<Recibo, number>(`${environment.endpoint}/recibos`, recibo, this.http.optsName('crear recibo'));
  }

  public eliminar(id:number) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/recibos/${id}`, this.http.optsName('eliminar recibo'));
  }
}
