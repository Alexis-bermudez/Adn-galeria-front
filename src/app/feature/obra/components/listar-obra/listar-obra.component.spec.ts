import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarObraComponent } from './listar-obra.component';

describe('ListarObraComponent', () => {
  let component: ListarObraComponent;
  let fixture: ComponentFixture<ListarObraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarObraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarObraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
