import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { ListarReciboComponent } from './../listar-recibo/listar-recibo.component';
import { ObraService } from './../../../obra/shared/service/obra.service';
import { ReciboService } from './../../shared/service/recibo.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrearReciboComponent } from './crear-recibo.component';
import { Router, Routes } from '@angular/router';
import { HttpService } from '@core/services/http.service';
import { Obra } from 'src/app/feature/obra/shared/model/obra';
import { Recibo } from '../../shared/model/recibo';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

describe('CrearReciboComponent', () => {
  let component: CrearReciboComponent;
  let fixture: ComponentFixture<CrearReciboComponent>;
  let reciboService:ReciboService;
  let obraService:ObraService;
  const routes:Routes = [
    {
      path: 'recibo/listar',
      component: ListarReciboComponent
    }
  ];
  const router = {
    navigate: jasmine.createSpy('navigate')
  }
  const obras:Obra[] = [
    new Obra(1, 'El grito', 'SURREALISMO', 1200000, false),
    new Obra(2, 'La gran ola', 'REALISMO', 9600000, true)
  ];
  const recibos:Recibo[] = [
    new Recibo(2, 1284000, true, '2022-03-27', '2022-03-27', 'SURREALISMO', 2)
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearReciboComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule
      ],
      providers: [
        ReciboService,
        ObraService,
        HttpService,
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearReciboComponent);
    component = fixture.componentInstance;
    reciboService = TestBed.inject(ReciboService);
    obraService = TestBed.inject(ObraService);
    spyOn(reciboService, 'listar').and.returnValue(of(recibos));
    spyOn(reciboService, 'crear').and.returnValue(of(3));
    spyOn(obraService, 'listar').and.returnValue(of(obras));
    spyOn(obraService, 'actualizar').and.returnValue(of(void 0));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario invalido cuando esta vacio', () => {
    expect(component.formulario.valid).toBeFalsy();
  });

  it('Creando recibo', () => {
    expect(component.formulario.valid).toBeFalsy();
    component.formulario.controls.obra.setValue('El grito');
    component.formulario.controls.entregaInmediata.setValue(false);
    component.formulario.controls.fechaCompra.setValue('2022-03-25');
    expect(component.formulario.valid).toBeTruthy();
    component.crear();
    Swal.clickConfirm();
    expect(router.navigate).toHaveBeenCalledWith(['/recibo/listar']);
    expect(reciboService.crear).toHaveBeenCalled();
  });

  it('Al crear con formulario vacio, marca todos como touched', () => {
    expect(component.formulario.valid).toBeFalsy();
    component.crear();
    expect(component.formulario.touched).toBeTruthy();
  });

  it('Creando recibo con fecha en sabado para ser rechazado', () => {
    expect(component.formulario.valid).toBeFalsy();
    component.formulario.controls.obra.setValue('El grito');
    component.formulario.controls.entregaInmediata.setValue(false);
    component.formulario.controls.fechaCompra.setValue('2022-03-26');
    expect(component.formulario.valid).toBeTruthy();
    component.crear();
    setTimeout(() => {
      expect(Swal.getTitle().innerHTML).toBe('Oh no, es sábado...');
      Swal.clickConfirm();
    });
  });

  it('Creando recibo para obra por fuera de la lista', () => {
    expect(component.formulario.valid).toBeFalsy();
    component.formulario.controls.obra.setValue('La gran ola');
    component.formulario.controls.entregaInmediata.setValue(false);
    component.formulario.controls.fechaCompra.setValue('2022-03-25');
    expect(component.formulario.valid).toBeTruthy();
    component.crear();
    setTimeout(() => {
      expect(Swal.getTitle().innerHTML).toBe('Oops...');
      Swal.clickConfirm();
    });
  });
});
