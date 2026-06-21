import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero'; 
import { Login } from './components/login/login';
import { Clientes } from './components/clientes/clientes';
import { AgendaComponent } from './components/agenda/agenda';
import { Checkout } from './components/checkout/checkout';
import { TiendaComponent } from './components/tienda/tienda';
import { Insumos } from './components/insumos/insumos';
import { PedidosComponent } from './components/pedidos/pedidos';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'login', component: Login },
  { path: 'clientes', component: Clientes },
  { path: 'agenda', component: AgendaComponent },
  { path: 'tienda', component: TiendaComponent }, 
  { path: 'insumos', component: Insumos },
  { path: 'checkout', component: Checkout },
  { path: 'pedidos', component: PedidosComponent },
  { path: '**', redirectTo: '' } 
];