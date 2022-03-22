import { Obra } from './../model/obra';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ObraService {

  constructor(protected http: HttpService) {}

  public listar() {
    return this.http.doGet<Obra[]>(`${environment.endpoint}/obras`, this.http.optsName('listar obras'));
  }

  public crear(obra:Obra) {
    return this.http.doPost<Obra, boolean>(`${environment.endpoint}/obras`, obra, this.http.optsName('crear obra'));
  }

  public actualizar(obra:Obra) {
    return this.http.doPut<Obra, boolean>(`${environment.endpoint}/obras/${obra.id}`, obra, this.http.optsName('actualizar obra'));
  }

  public eliminar(id:number) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/obras/${id}`, this.http.optsName('eliminar obra'));
  }
}
