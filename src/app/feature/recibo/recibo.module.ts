import { ObraService } from './../obra/shared/service/obra.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ReciboService } from './shared/service/recibo.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReciboRoutingModule } from './recibo-routing.module';
import { ReciboComponent } from './components/recibo/recibo.component';
import { ListarReciboComponent } from './components/listar-recibo/listar-recibo.component';
import { CrearReciboComponent } from './components/crear-recibo/crear-recibo.component';

@NgModule({
  declarations: [
    ReciboComponent,
    ListarReciboComponent,
    CrearReciboComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReciboRoutingModule
  ],
  providers: [ReciboService, ObraService]
})
export class ReciboModule { }
