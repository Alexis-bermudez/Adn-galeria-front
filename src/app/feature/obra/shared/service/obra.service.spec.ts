import { Obra } from './../model/obra';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ObraService } from './obra.service';
import { HttpResponse } from '@angular/common/http';

describe('ObraService', () => {
  let httpMock: HttpTestingController;
  let service: ObraService;
  const apiEndpointObras = `${environment.endpoint}/obras`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ObraService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ObraService);
  });

  it('should be created', () => {
    const obraService: ObraService = TestBed.inject(ObraService);
    expect(obraService).toBeTruthy();
  });

  it('Deberia listar las obras', () => {
    const dummyObras = [
      new Obra(1, 'La Gioconda', 'REALISMO', 3600000, false),
      new Obra(2, 'El Grito', 'SURREALISMO', 1200000, true)
    ];
    service.listar().subscribe(obras => {
      expect(obras.length).toEqual(2);
      expect(obras).toEqual(dummyObras);
    });
    const req = httpMock.expectOne(apiEndpointObras);
    expect(req.request.method).toBe('GET');
    req.flush(dummyObras);
  });

  it('Deberia crear una obra', () => {
    const dummyObra = new Obra(null, 'La Gioconda', 'REALISMO', 3600000, false);
    service.crear(dummyObra).subscribe((id) => {
      expect(id).toEqual(1);
    });
    const req = httpMock.expectOne(`${apiEndpointObras}`);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({body: 1}));
  });

  it('Deberia actualizar la obra', () => {
    const dummyObra = new Obra(1, 'La Gioconda', 'REALISMO', 3600000, false);
    service.actualizar(dummyObra).subscribe();
    const req = httpMock.expectOne(`${apiEndpointObras}/${dummyObra.id}`);
    expect(req.request.method).toBe('PUT');
  });

  it('Deberia eliminar la obra', () => {
    service.eliminar(1).subscribe();
    const req = httpMock.expectOne(`${apiEndpointObras}/1`);
    expect(req.request.method).toBe('DELETE');
  });
});
