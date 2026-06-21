import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ItemPedido {
  productName: string;
  quantity: number;
  price: number;
}

export interface Pedido {
  id: string;
  clienteId: string;
  clienteNombre: string;
  fecha: Date;
  items: ItemPedido[];
  total: number;
  estado: 'Pendiente' | 'Aprobado' | 'Cancelado';
  motivoCancelacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  // Lista inicial simulada para desarrollo con el nuevo producto agregado
  private pedidosIniciales: Pedido[] = [
    {
      id: 'PED-1024',
      clienteId: 'cli_1',
      clienteNombre: 'Juan Pérez',
      fecha: new Date('2026-06-20T14:30:00'),
      items: [{ productName: 'Bomba Vulcano BAE 0.5 HP', quantity: 1, price: 189900 }],
      total: 189900,
      estado: 'Pendiente'
    },
    {
      id: 'PED-1025',
      clienteId: 'cli_2',
      clienteNombre: 'María José',
      fecha: new Date('2026-06-21T09:15:00'),
      items: [
        { productName: 'Cloro Pastillas 1kg', quantity: 2, price: 11200 },
        { productName: 'Kit de Limpieza', quantity: 1, price: 36500 }
      ],
      total: 58900,
      estado: 'Aprobado'
    },
    // NUEVO PEDIDO AGREGADO:
    {
      id: 'PED-1026',
      clienteId: 'cli_1', // Asociado también a Juan Pérez para que lo vea en modo cliente
      clienteNombre: 'Juan Pérez',
      fecha: new Date('2026-06-21T15:45:00'),
      items: [
        { productName: 'Limpiafondos Automático Robot', quantity: 1, price: 245000 },
        { productName: 'Alguicida Líquido 5L', quantity: 2, price: 8900 }
      ],
      total: 262800,
      estado: 'Pendiente'
    }
  ];

  private pedidosSubject = new BehaviorSubject<Pedido[]>(this.pedidosIniciales);
  pedidos$: Observable<Pedido[]> = this.pedidosSubject.asObservable();

  constructor() {}

  crearPedido(clienteId: string, nombre: string, items: ItemPedido[], total: number) {
    const nuevoPedido: Pedido = {
      id: `PED-${Math.floor(1000 + Math.random() * 9000)}`,
      clienteId,
      clienteNombre: nombre,
      fecha: new Date(),
      items,
      total,
      estado: 'Pendiente'
    };

    const listaActual = this.pedidosSubject.getValue();
    this.pedidosSubject.next([nuevoPedido, ...listaActual]);
  }

  cancelarPedidoCliente(pedidoId: string) {
    const listaActual = this.pedidosSubject.getValue();
    const listaModificada = listaActual.map(p => {
      if (p.id === pedidoId && p.estado === 'Pendiente') {
        return { ...p, estado: 'Cancelado' as const, motivoCancelacion: 'Cancelado por el cliente.' };
      }
      return p;
    });
    this.pedidosSubject.next(listaModificada);
  }

  cancelarPedidoAdmin(pedidoId: string, motivo: string) {
    const listaActual = this.pedidosSubject.getValue();
    const listaModificada = listaActual.map(p => {
      if (p.id === pedidoId) {
        return { ...p, estado: 'Cancelado' as const, motivoCancelacion: `Admin: ${motivo}` };
      }
      return p;
    });
    this.pedidosSubject.next(listaModificada);
  }
}