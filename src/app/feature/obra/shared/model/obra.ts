export class Obra {
  id: number;
  titulo: string;
  tipoObra: string;
  precio: number;
  vendido: boolean;

  constructor(id: number, titulo: string, tipoObra: string, precio: number, vendido: boolean){
    this.id = id;
    this.titulo = titulo;
    this.tipoObra = tipoObra;
    this.precio = precio;
    this.vendido = vendido;
  }
}
