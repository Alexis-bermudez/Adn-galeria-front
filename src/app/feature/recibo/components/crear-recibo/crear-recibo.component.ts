import { Obra } from './../../../obra/shared/model/obra';
import { ObraService } from './../../../obra/shared/service/obra.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Recibo } from '../../shared/model/recibo';
import { ReciboService } from '../../shared/service/recibo.service';

const TWO_DIGITS = 10;
const DIA_PROHIBIDO = 6;

@Component({
  selector: 'app-crear-recibo',
  templateUrl: './crear-recibo.component.html',
  styles: []
})
export class CrearReciboComponent implements OnInit {

  constructor(
    private obraService: ObraService,
    private reciboService: ReciboService,
    private fb: FormBuilder,
    private router: Router
    ) { }

  hayObrasParaVender = false;

  fechaActual:string;

  formulario: FormGroup = this.fb.group({
    obra: ['', [Validators.required]],
    entregaInmediata: [false],
    fechaCompra: []
  });

  obras: Obra[];
  obrasParaVender: Obra[];
  recibos: Recibo[];

  ngOnInit(): void {
    this.obraService.listar().subscribe(obras => {
      this.obras = obras;
      if (this.obras.find(obra => obra.vendido)){
        this.obrasParaVender = this.obras.filter(obra => obra.vendido);
        this.hayObrasParaVender = true;
        this.reciboService.listar().subscribe(recibos => {
          this.recibos = recibos;
        });

        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1) < TWO_DIGITS ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        const day = date.getDate() < TWO_DIGITS ? '0' + date.getDate().toString() : date.getDate().toString();
        this.fechaActual = `${year}-${month}-${day}`;
      }
    });

  }

  crear(){
    if (this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }

    const tituloObra = this.formulario.controls.obra.value;
    const obra: Obra = this.obras.find(o => o.titulo === tituloObra);
    obra.vendido = true;

    const dia = new Date(this.formulario.controls.fechaCompra.value);
    dia.setDate(dia.getDate() + 1);

    if (dia.getDay() === DIA_PROHIBIDO){
      Swal.fire({
        icon: 'error',
        title: 'Oh no, es sábado...',
        text: 'No se pueden vender obras los días sábados.',
      });
      return;
    }

    const recibo: Recibo = new Recibo(
      null,
      obra.precio,
      this.formulario.controls.entregaInmediata.value,
      this.formulario.controls.fechaCompra.value,
      null,
      obra.tipoObra,
      obra.id
    );
    if (this.recibos?.find(t => t.idObra === recibo.idObra)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se encontró la obra, quizá ya tenga recibo o esté registrada.',
      });
      return;
    }

    this.reciboService.crear(recibo).subscribe(resp => {
      this.obraService.actualizar(obra).subscribe();
      if (resp){
        this.router.navigate(['/recibo/listar']);
      }
    });

  }

  verify(campo: string){
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

}
