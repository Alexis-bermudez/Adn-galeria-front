import { HttpService } from './../../../../core/services/http.service';
import { Recibo } from './../model/recibo';
import { environment } from 'src/environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ReciboService } from './recibo.service';
import { HttpResponse } from '@angular/common/http';

describe('ReciboService', () => {
  let httpMock: HttpTestingController;
  let service: ReciboService;
  const apiEndpointRecibos = `${environment.endpoint}/recibos`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReciboService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ReciboService);
  });

  it('should be created', () => {
    const reciboService: ReciboService = TestBed.inject(ReciboService);
    expect(reciboService).toBeTruthy();
  });

  it('Deberia listar los recibos', () => {
    const dummyRecibos = [
      new Recibo(1, 3600000, false, '2022-03-24', '2022-04-08', 'REALISMO', 3),
      new Recibo(2, 1200000, true, '2022-03-24', '2022-03-24', 'REALISMO', 3)
    ];
    service.listar().subscribe(recibos => {
      expect(recibos.length).toEqual(2);
      expect(recibos).toEqual(dummyRecibos);
    });
    const req = httpMock.expectOne(apiEndpointRecibos);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRecibos);
  });

  it('Deberia crear un recibo', () => {
    const dummyRecibo = new Recibo(null, 3600000, false, '2022-03-24', '2022-04-08', 'REALISMO', 1);
    service.crear(dummyRecibo).subscribe((id) => {
      expect(id).toEqual(1);
    });
    const req = httpMock.expectOne(apiEndpointRecibos);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({body: 1}));
  });

  it('Deberia eliminar el recibo', () => {
    service.eliminar(1).subscribe();
    const req = httpMock.expectOne(`${apiEndpointRecibos}/1`);
    expect(req.request.method).toBe('DELETE');
  });
});
