import { Router } from '@angular/router';
import { ObraService } from './../../shared/service/obra.service';
import { Obra } from './../../shared/model/obra';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

const LONGITUD_MINIMA_TITULO = 3;
const PRECIO_MINIMO_OBRA = 1;

@Component({
  selector: 'app-crear-obra',
  templateUrl: './crear-obra.component.html',
  styleUrls: ['./crear-obra.component.css']
})
export class CrearObraComponent implements OnInit {

  constructor(
    private obraService:ObraService,
    private fb:FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.obraService.listar().subscribe(resp => {
      this.obras = resp;
    });
  }

  formulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(LONGITUD_MINIMA_TITULO)]],
    tipoObra: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(PRECIO_MINIMO_OBRA)]],
  });

  obras:Obra[];

  crear(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }

    let obra:Obra = new Obra(
      null,
      this.formulario.controls["titulo"].value,
      this.formulario.controls["tipoObra"].value,
      this.formulario.controls["precio"].value,
      false
      );


    if(this.obras.find(t=>t.titulo == obra.titulo)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ya existe una obra con ese nombre.',
      })
      return;
    }

    this.obraService.crear(obra).subscribe(resp => {
      if(resp){this.router.navigate(['/obra/listar']);}
    });

  }

  verify(campo:string){
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

}
