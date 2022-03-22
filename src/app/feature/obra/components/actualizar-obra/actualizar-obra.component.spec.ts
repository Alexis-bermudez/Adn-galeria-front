import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarObraComponent } from './actualizar-obra.component';

describe('ActualizarObraComponent', () => {
  let component: ActualizarObraComponent;
  let fixture: ComponentFixture<ActualizarObraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarObraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
