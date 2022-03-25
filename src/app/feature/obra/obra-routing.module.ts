import { ActualizarObraComponent } from './components/actualizar-obra/actualizar-obra.component';
import { ListarObraComponent } from './components/listar-obra/listar-obra.component';
import { CrearObraComponent } from './components/crear-obra/crear-obra.component';
import { ObraComponent } from './components/obra/obra.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ObraComponent,
    children: [
      {
        path: 'crear',
        component: CrearObraComponent
      },
      {
        path: 'listar',
        component: ListarObraComponent
      },
      {
        path: 'editar/:id',
        component: ActualizarObraComponent
      },
      {
        path: '**',
        redirectTo: 'listar'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObraRoutingModule { }
