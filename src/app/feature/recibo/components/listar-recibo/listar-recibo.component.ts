import { Recibo } from './../../shared/model/recibo';
import { Component, OnInit } from '@angular/core';
import { ReciboService } from '../../shared/service/recibo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-recibo',
  templateUrl: './listar-recibo.component.html',
  styleUrls: ['./listar-recibo.component.css']
})
export class ListarReciboComponent implements OnInit {

  constructor(
    private reciboService:ReciboService,
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  recibos:Recibo[];

  listar(){
    this.reciboService.listar().subscribe(resp => {
      this.recibos = resp;
    });
  }

  eliminar(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-2',
        cancelButton: 'btn btn-danger m-2'
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
        this.reciboService.eliminar(id).subscribe();
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'El recibo ha sido eliminado.',
          'success'
        )
        this.listar();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El recibo está a salvo.',
          'error'
        )
      }
    })
  }
}
