import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/a[0]'));
    linkObra = element(by.xpath('/html/body/app-root/app-navbar/nav/a[1]'));

    async clickLinkObra() {
      await this.linkObra.click();
    }
}
