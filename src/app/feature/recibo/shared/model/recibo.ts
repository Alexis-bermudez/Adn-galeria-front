export class Recibo {
  id:number;
  total:number;
  entregaInmediata:boolean;
  fechaCompra:string;
  fechaEntrega:string;
  tipoObra:string;
  idObra:number;

  constructor(id:number, total:number, entregaInmediata:boolean, fechaCompra:string, fechaEntrega:string, tipoObra:string, idObra:number){
    this.id = id;
    this.total = total;
    this.entregaInmediata = entregaInmediata;
    this.fechaCompra = fechaCompra;
    this.fechaEntrega = fechaEntrega;
    this.tipoObra = tipoObra;
    this.idObra = idObra;
  }
}
