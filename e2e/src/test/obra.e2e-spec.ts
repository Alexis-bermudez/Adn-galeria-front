import { ObraPage } from './../page/obra/obra.po';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';

describe('workspace-project Producto', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let obra: ObraPage;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        obra = new ObraPage();
    });

    it('Deberia crear obra', () => {
        const TITULO = 'La Gioconda';
        const TIPO_OBRA = 'REALISMO';
        const PRECIO = 3600000;

        page.navigateTo();
        navBar.clickLinkObra();
        obra.clickBotonCrearObra();
        obra.ingresarTitulo(TITULO);
        obra.ingresarTipoObra(TIPO_OBRA);
        obra.ingresarPrecio(PRECIO);
        obra.clickBotonEnviarCreacion();

        expect(obra.contarObras()).toBe(1);
    });

    it('Deberia listar productos', () => {
        page.navigateTo();
        navBar.clickLinkObra();

        expect(obra.contarObras()).toBe(1);
    });
});
