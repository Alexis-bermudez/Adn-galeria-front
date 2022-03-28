import { ListarReciboComponent } from './components/listar-recibo/listar-recibo.component';
import { CrearReciboComponent } from './components/crear-recibo/crear-recibo.component';
import { ReciboComponent } from './components/recibo/recibo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReciboComponent,
    children: [
      {
        path: 'crear',
        component: CrearReciboComponent
      },
      {
        path: 'listar',
        component: ListarReciboComponent
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
export class ReciboRoutingModule { }
