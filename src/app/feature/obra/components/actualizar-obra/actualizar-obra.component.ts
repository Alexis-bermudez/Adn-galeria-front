import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Obra } from '../../shared/model/obra';
import { ObraService } from '../../shared/service/obra.service';

@Component({
  selector: 'app-actualizar-obra',
  templateUrl: './actualizar-obra.component.html',
  styleUrls: ['./actualizar-obra.component.css']
})
export class ActualizarObraComponent implements OnInit {

  formulario: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    tipoObra: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.min(1)]],
  })

  constructor(
    private activeRoute:ActivatedRoute,
    private obraService:ObraService,
    private fb:FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  actualizar(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched();
      return;
    }

    let obra:Obra = new Obra(
      this.activeRoute.snapshot.params.id,
      this.formulario.controls["titulo"].value,
      this.formulario.controls["tipoObra"].value,
      this.formulario.controls["precio"].value,
      false
      );

    this.obraService.actualizar(obra).subscribe();
    this.router.navigate(['/obra/listar']);

  }

  verify(campo:string){
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

}
