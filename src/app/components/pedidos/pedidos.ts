import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosComponent implements OnInit, OnDestroy {
  esAdmin = false;
  idUsuarioActual = 'cli_1'; // Esto idealmente vendría de tu AuthService
  pedidosFiltrados: Pedido[] = [];
  
  private subPedidos!: Subscription;

  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // 1. Verificamos el rol del usuario actual
    this.authService.isAdmin$.subscribe(status => {
      this.esAdmin = status;
    });

    // 2. Nos suscribimos al flujo reactivo de pedidos. 
    // Cada vez que se use .next() en el servicio, esta suscripción reaccionará al instante.
    this.subPedidos = this.pedidoService.pedidos$.subscribe(todosLosPedidos => {
      if (this.esAdmin) {
        // El administrador ve absolutamente todo
        this.pedidosFiltrados = todosLosPedidos;
      } else {
        // El cliente solo ve sus compras asociadas a su ID
        this.pedidosFiltrados = todosLosPedidos.filter(p => p.clienteId === this.idUsuarioActual);
      }
    });
  }

  ngOnDestroy() {
    if (this.subPedidos) {
      this.subPedidos.unsubscribe();
    }
  }

  cancelarCliente(id: string) {
    if (confirm('¿Estás seguro de que deseas cancelar este pedido?')) {
      this.pedidoService.cancelarPedidoCliente(id);
    }
  }

  cancelarAdmin(id: string) {
    // Motivos sugeridos automáticos o ingresados por el administrador
    const motivosSugeridos = [
      'Quiebre de Stock temporal',
      'Problemas logísticos en zona de entrega',
      'Duplicidad de pago o error del usuario',
      'Otros'
    ];
    
    const mensajePrompt = `Selecciona o escribe el motivo del rechazo:\n\nSugeridos:\n- ${motivosSugeridos.join('\n- ')}\n\nEscribe el motivo:`;
    const motivo = prompt(mensajePrompt);

    if (motivo && motivo.trim() !== '') {
      this.pedidoService.cancelarPedidoAdmin(id, motivo);
    } else if (motivo !== null) {
      alert('Debes ingresar un motivo válido para cancelar el pedido.');
    }
  }
}