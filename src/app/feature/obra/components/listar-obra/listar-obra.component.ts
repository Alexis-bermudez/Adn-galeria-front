import { Obra } from './../../shared/model/obra';
import { ObraService } from './../../shared/service/obra.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-obra',
  templateUrl: './listar-obra.component.html',
  styles: []
})
export class ListarObraComponent implements OnInit {

  constructor(
    private obraService: ObraService
  ) { }

  obras: Obra[];

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.obraService.listar().subscribe(resp => {
      this.obras = resp;
    });
  }

  eliminar(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger m-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.obraService.eliminar(id).subscribe();
        swalWithBootstrapButtons.fire(
          '¡Eliminada!',
          'La obra ha sido eliminada.',
          'success'
        );
        this.listar();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La obra está a salvo.',
          'error'
        );
      }
    });
  }

}
