import { ObraService } from './shared/service/obra.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObraRoutingModule } from './obra-routing.module';
import { ObraComponent } from './components/obra/obra.component';
import { CrearObraComponent } from './components/crear-obra/crear-obra.component';
import { ListarObraComponent } from './components/listar-obra/listar-obra.component';
import { ActualizarObraComponent } from './components/actualizar-obra/actualizar-obra.component';


@NgModule({
  declarations: [
    ObraComponent,
    CrearObraComponent,
    ListarObraComponent,
    ActualizarObraComponent
  ],
  imports: [
    CommonModule,
    ObraRoutingModule
  ],
  providers: [ObraService]
})
export class ObraModule { }
