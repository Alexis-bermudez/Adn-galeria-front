import { Observable } from 'rxjs';
import { Obra } from './../../shared/model/obra';
import { ObraService } from './../../shared/service/obra.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-obra',
  templateUrl: './listar-obra.component.html',
  styleUrls: ['./listar-obra.component.css']
})
export class ListarObraComponent implements OnInit {
  obras:Observable<Obra[]>;

  constructor(private obraService:ObraService) { }

  ngOnInit(): void {
    this.obras = this.obraService.listar();
  }

  eliminar(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.obraService.eliminar(id);
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'La obra ha sido eliminada',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La obra está a salvo.',
          'error'
        )
      }
    })
  }

}
