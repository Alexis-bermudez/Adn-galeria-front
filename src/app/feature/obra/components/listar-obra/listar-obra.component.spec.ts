import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from './../../../../core/services/http.service';
import Swal from 'sweetalert2';
import { Obra } from './../../shared/model/obra';

import { CommonModule } from '@angular/common';
import { ObraService } from './../../shared/service/obra.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarObraComponent } from './listar-obra.component';
import { of } from 'rxjs';

describe('ListarObraComponent', () => {
  let component: ListarObraComponent;
  let fixture: ComponentFixture<ListarObraComponent>;
  let obraService: ObraService;
  const obras: Obra[] = [
    new Obra(1, 'El grito', 'SURREALISMO', 1200000, false),
    new Obra(2, 'La gran ola', 'REALISMO', 9600000, true)
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarObraComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule
      ],
      providers: [
        ObraService,
        HttpService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarObraComponent);
    component = fixture.componentInstance;
    obraService = TestBed.inject(ObraService);
    spyOn(obraService, 'listar').and.returnValue(of(obras));
    spyOn(obraService, 'eliminar').and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia listar las obras', () => {
    expect(component.obras).toEqual(obras);
  });

  it('Deberia eliminar una obra', () => {
    component.eliminar(1);
    expect(Swal.isVisible).toBeTruthy();
    expect(Swal.getTitle().innerHTML).toBe('¿Estás seguro?');
    Swal.clickConfirm();
    setTimeout(() => {
      expect(Swal.getTitle().innerHTML).toBe('¡Eliminada!');
      Swal.clickConfirm();
    });
  });

  it('Deberia cancelar al eliminar una obra', () => {
    component.eliminar(1);
    expect(Swal.getTitle().innerHTML).toBe('¿Estás seguro?');
    Swal.clickCancel();
    setTimeout(() => {
      expect(Swal.getTitle().innerHTML).toBe('Cancelado');
      Swal.clickConfirm();
    });
  });
});
