import { Routes } from '@angular/router';
import { CadastroEvento } from './pages/cadastro-evento/cadastro-evento';
import { DetalheEvento } from './pages/detalhe-evento/detalhe-evento';
import { Participantes } from './pages/participantes/participantes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'eventos/novo'
  },
  {
    path: 'eventos/novo',
    component: CadastroEvento
  },
  {
    path: 'eventos/:id/participantes',
    component: Participantes
  },
  {
    path: 'eventos/:id',
    component: DetalheEvento
  },
  {
    path: '**',
    redirectTo: 'eventos/novo'
  }
];
