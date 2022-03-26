import { Obra } from './../../../obra/shared/model/obra';
import { ObraService } from './../../../obra/shared/service/obra.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Recibo } from '../../shared/model/recibo';
import { ReciboService } from '../../shared/service/recibo.service';

@Component({
  selector: 'app-crear-recibo',
  templateUrl: './crear-recibo.component.html',
  styleUrls: ['./crear-recibo.component.css']
})
export class CrearReciboComponent implements OnInit {

  constructor(
    private obraService:ObraService,
    private reciboService:ReciboService,
    private fb:FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.obraService.listar().subscribe(resp => {
      this.obras = resp;
      if(this.obras.find(obra=>obra.vendido == false)){
        this.obrasParaVender = this.obras.filter(obra => {return obra.vendido == false})
        this.hayObrasParaVender = true;
        this.reciboService.listar().subscribe(resp => {
          this.recibos = resp;
        });

        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1) < 10 ? "0"+(date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        const day = date.getDate() < 10 ? "0"+date.getDate().toString() : date.getDate().toString();
        this.fechaActual = year+"-"+month+"-"+day
      }
    });

  }

  hayObrasParaVender:boolean = false;

  fechaActual:String;

  diaProhibido:number = 6;

  formulario: FormGroup = this.fb.group({
    obra: ['', [Validators.required]],
    entregaInmediata: [false],
    fechaCompra: []
  });

  obras:Obra[];
  obrasParaVender:Obra[];
  recibos:Recibo[];

  crear(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }

    let tituloObra = this.formulario.controls["obra"].value;
    let obra:Obra = this.obras.find(o => o.titulo == tituloObra);
    obra.vendido = true;

    let dia = new Date(this.formulario.controls["fechaCompra"].value);
    dia.setDate(dia.getDate()+1);

    if(dia.getDay() == this.diaProhibido){
      Swal.fire({
        icon: 'error',
        title: 'Oh no, es sábado...',
        text: 'No se pueden vender obras los días sábados.',
      })
      return;
    }

    let recibo:Recibo = new Recibo(
      null,
      obra.precio,
      this.formulario.controls["entregaInmediata"].value,
      this.formulario.controls["fechaCompra"].value,
      null,
      obra.tipoObra,
      obra.id
    );
    if(this.recibos?.find(t=>t.idObra == recibo.idObra)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se encontró la obra, quizá ya tenga recibo o esté registrada.',
      })
      return;
    }

    this.reciboService.crear(recibo).subscribe(resp => {
      this.obraService.actualizar(obra).subscribe();
      if(resp){this.router.navigate(['/recibo/listar']);}
    });

  }

  verify(campo:string){
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

}
