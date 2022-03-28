import { HttpService } from './../../../../core/services/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { Recibo } from './../../shared/model/recibo';
import { ReciboService } from './../../shared/service/recibo.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarReciboComponent } from './listar-recibo.component';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

describe('ListarReciboComponent', () => {
  let component: ListarReciboComponent;
  let fixture: ComponentFixture<ListarReciboComponent>;
  let reciboService: ReciboService;
  const recibos: Recibo[] = [
    new Recibo(1, 3600000, false, '2022-03-25', '2022-04-09', 'REALISMO', 1),
    new Recibo(2, 1284000, true, '2022-03-27', '2022-03-27', 'SURREALISMO', 2)
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarReciboComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule
      ],
      providers: [
        ReciboService,
        HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReciboComponent);
    component = fixture.componentInstance;
    reciboService = TestBed.inject(ReciboService);
    spyOn(reciboService, 'listar').and.returnValue(of(recibos));
    spyOn(reciboService, 'eliminar').and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia listar los recibos', () => {
    expect(component.recibos).toEqual(recibos);
  });

  it('Deberia eliminar un recibo', () => {
    component.eliminar(1);
    expect(Swal.isVisible).toBeTruthy();
    expect(Swal.getTitle().innerHTML).toBe('¿Estás seguro?');
    Swal.clickConfirm();
    setTimeout(() => {
      expect(Swal.getTitle().innerHTML).toBe('¡Eliminado!');
      Swal.clickConfirm();
    });
  });

  it('Deberia cancelar al eliminar un recibo', () => {
    component.eliminar(1);
    expect(Swal.getTitle().innerHTML).toBe('¿Estás seguro?');
    Swal.clickCancel();
    setTimeout(() => {
      expect(Swal.getTitle().innerHTML).toBe('Cancelado');
      Swal.clickConfirm();
    });
  });
});
