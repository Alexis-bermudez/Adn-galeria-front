import { ListarObraComponent } from './../listar-obra/listar-obra.component';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ObraService } from './../../shared/service/obra.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActualizarObraComponent } from './actualizar-obra.component';
import { CrearObraComponent } from '../crear-obra/crear-obra.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ActualizarObraComponent', () => {
  let component: ActualizarObraComponent;
  let fixture: ComponentFixture<ActualizarObraComponent>;
  let obraService:ObraService;
  const routes:Routes = [
    {
      path: 'obra/listar',
      component: ListarObraComponent
    }
  ];
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearObraComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule
      ],
      providers: [
        ObraService,
        HttpService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: 1}}
          }
        },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarObraComponent);
    component = fixture.componentInstance;
    obraService = TestBed.inject(ObraService);
    spyOn(obraService, 'actualizar').and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario invalido cuando esta vacio', () => {
    expect(component.formulario.valid).toBeFalsy();
  });

  it('Actualizar la obra', () => {
    expect(component.formulario.valid).toBeFalsy();
    component.formulario.controls.titulo.setValue('La última cena');
    component.formulario.controls.tipoObra.setValue('REALISMO');
    component.formulario.controls.precio.setValue(9600000);
    expect(component.formulario.valid).toBeTruthy();
    component.actualizar();
    expect(router.navigate).toHaveBeenCalledWith(['/obra/listar']);
  });

  it('Al crear con formulario vacio, marca todos como touched', () => {
    expect(component.formulario.valid).toBeFalsy();
    component.actualizar();
    expect(component.formulario.touched).toBeTruthy();
  });
});
