import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero'; // Tu página principal
import { Login} from './components/login/login';
import { Clientes } from './components/clientes/clientes';
import { AgendaComponent } from './components/agenda/agenda';

export const routes: Routes = [
  { path: '', component: HeroComponent },     // Página inicial (Piscina)
  { path: 'login', component: Login }, // Página de Login
  { path: 'clientes', component: Clientes }, // Nueva página de clientes
  { path: 'agenda', component: AgendaComponent },
  { path: '**', redirectTo: '' }           // Redirigir si la ruta no existe

];