import { by, element } from 'protractor';

export class ObraPage {
  private btnCrearObra = element(by.id('btnCrearObra'));
  private btnEnviarForm = element(by.id('btnEnviarForm'));
  private inputTitulo = element(by.id('titulo'));
  private selectTipoObra = element(by.id('tipoObra'));
  private inputPrecio = element(by.id('precio'));
  private listaObras = element.all(by.css('tr.obra'));

  async clickBotonEnviarCreacion() {
    await this.btnEnviarForm.click();
  }

  async clickBotonCrearObra() {
    await this.btnCrearObra.click();
  }

  async ingresarTitulo(titulo:string) {
    await this.inputTitulo.sendKeys(titulo);
  }

  async ingresarTipoObra(tipoObra:string) {
    await this.selectTipoObra.sendKeys(tipoObra);
  }

  async ingresarPrecio(precio:number) {
    await this.inputPrecio.sendKeys(precio);
  }

  async contarObras() {
    return this.listaObras.count();
  }
}
