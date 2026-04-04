import { Routes } from '@angular/router';
import { Hero } from './components/hero/hero'; // Tu página principal
import { Login} from './components/login/login';

export const routes: Routes = [
  { path: '', component: Hero },     // Página inicial (Piscina)
  { path: 'login', component: Login }, // Página de Login
  { path: '**', redirectTo: '' }               // Redirigir si la ruta no existe
];