import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarReciboComponent } from './listar-recibo.component';

describe('ListarReciboComponent', () => {
  let component: ListarReciboComponent;
  let fixture: ComponentFixture<ListarReciboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarReciboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
