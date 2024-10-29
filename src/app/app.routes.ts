import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home/home.component';

import {ClientesListComponent} from './clientes/clientes-list/clientes-list.component';
import {ClientesCreateComponent} from './clientes/clientes-create/clientes-create.component';
import {ClientesDetailComponent} from './clientes/clientes-detail/clientes-detail.component';
import {ClientesEditComponent} from './clientes/clientes-edit/clientes-edit.component'; // Ajusta la ruta según sea necesario

import {OportunidadesListComponent} from './oportunidades/oportunidades-list/oportunidades-list.component';
import {OportunidadesCreateComponent} from './oportunidades/oportunidades-create/oportunidades-create.component';
import {OportunidadesDetailComponent} from './oportunidades/oportunidades-detail/oportunidades-detail.component';
import {OportunidadesEditComponent} from './oportunidades/oportunidades-edit/oportunidades-edit.component';

import {InteraccionesListComponent} from './interacciones/interacciones-list/interacciones-list.component';
import {InteraccionesCreateComponent} from './interacciones/interacciones-create/interacciones-create.component';
import {InteraccionesDetailComponent} from './interacciones/interacciones-detail/interacciones-detail.component';
import {InteraccionesEditComponent} from './interacciones/interacciones-edit/interacciones-edit.component';
import {LoginComponent} from './login/login/login.component';
import {AnaliticaComponent} from './analitica/analitica.component';


export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analitica', component: AnaliticaComponent },

  // Rutas para la gestión de clientes
  { path: 'clientes', component: ClientesListComponent }, // Listado de clientes
  { path: 'clientes/create', component: ClientesCreateComponent }, // Crear nuevo cliente
  { path: 'clientes/:id', component: ClientesDetailComponent }, // Detalle de cliente
  { path: 'clientes/:id/edit', component: ClientesEditComponent }, // Editar cliente

  // Rutas para la gestión de oportunidades
  { path: 'oportunidades', component: OportunidadesListComponent }, // Listado de oportunidades
  { path: 'oportunidades/create', component: OportunidadesCreateComponent }, // Crear nuevo cliente
  { path: 'oportunidades/:id', component: OportunidadesDetailComponent }, // Detalle de cliente
  { path: 'oportunidades/:id/edit', component: OportunidadesEditComponent }, // Editar cliente

  // Rutas para la gestión de interacciones
  { path: 'interacciones', component: InteraccionesListComponent }, // Listado de interacciones
  { path: 'interacciones/create', component: InteraccionesCreateComponent }, // Crear nuevo cliente
  { path: 'interacciones/:id', component: InteraccionesDetailComponent }, // Detalle de cliente
  { path: 'interacciones/:id/edit', component: InteraccionesEditComponent }, // Editar cliente

  // Otras rutas...
  { path: '**', redirectTo: '/home', pathMatch: 'full' } // Redirigir a la ruta por defecto para rutas no reconocidas
];
