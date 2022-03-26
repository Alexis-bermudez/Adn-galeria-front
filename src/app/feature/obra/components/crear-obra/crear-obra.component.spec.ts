import { ListarObraComponent } from './../listar-obra/listar-obra.component';
import { Obra } from './../../shared/model/obra';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ObraService } from './../../shared/service/obra.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrearObraComponent } from './crear-obra.component';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router, Routes } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CrearObraComponent', () => {
  let component: CrearObraComponent;
  let fixture: ComponentFixture<CrearObraComponent>;
  let obraService:ObraService;
  const routes:Routes = [
    {
      path: 'obra/listar',
      component: ListarObraComponent
    }
  ];
  const router = {
    navigate: jasmine.createSpy('navigate')
  }
  const obras:Obra[] = [
    new Obra(1, 'El grito', 'SURREALISMO', 1200000, false),
    new Obra(2, 'La gran ola', 'REALISMO', 9600000, true)
  ];

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
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearObraComponent);
    component = fixture.componentInstance;
    obraService = TestBed.inject(ObraService);
    spyOn(obraService, 'crear').and.returnValue(of(3));
    spyOn(obraService, 'listar').and.returnValue(of(obras));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario invalido cuando esta vacio', () => {
    expect(component.formulario.valid).toBeFalsy();
  });

  it('Creando obra', () => {
    expect(component.formulario.valid).toBeFalsy();
    component.formulario.controls.titulo.setValue('La Gioconda');
    component.formulario.controls.tipoObra.setValue('REALISMO');
    component.formulario.controls.precio.setValue(3600000);
    expect(component.formulario.valid).toBeTruthy();
    component.crear();
    Swal.clickConfirm();
    expect(router.navigate).toHaveBeenCalledWith(['/obra/listar']);
  });

  it('Al crear con formulario vacio, marca todos como touched', () => {
    expect(component.formulario.valid).toBeFalsy();
    component.crear();
    expect(component.formulario.touched).toBeTruthy();
  });

  it('Creando con titulo ya existen para ser rechazado', () => {
    expect(component.formulario.valid).toBeFalsy();
    component.formulario.controls.titulo.setValue('La gran ola');
    component.formulario.controls.tipoObra.setValue('REALISMO');
    component.formulario.controls.precio.setValue(3600000);
    expect(component.formulario.valid).toBeTruthy();
    component.crear();
    expect(Swal.getTitle().innerHTML).toBe("Oops...")
    Swal.clickConfirm();
  });
});
