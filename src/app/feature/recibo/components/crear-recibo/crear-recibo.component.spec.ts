import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearReciboComponent } from './crear-recibo.component';

describe('CrearReciboComponent', () => {
  let component: CrearReciboComponent;
  let fixture: ComponentFixture<CrearReciboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearReciboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
