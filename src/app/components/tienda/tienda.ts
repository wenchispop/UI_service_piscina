import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, Producto } from '../../services/cart.service';

interface ProductoTienda extends Producto {
  descripcion: string;
  stock: string;
  cantidad: number;
}

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tienda.html',
  styleUrls: ['./tienda.css']
})
export class TiendaComponent {
  productos: ProductoTienda[] = [
    { 
      id: 1, nombre: 'Filtro de Arena Emaux', precio: 89990, 
      imagen: 'https://limpiafondos.cl/wp-content/uploads/2025/06/12214100-1-Filtro-Emaux-P-768x768.webp', 
      categoria: 'Filtros', descripcion: 'Material de fibra de vidrio resistente.', stock: 'in', cantidad: 1 
    },
    { 
      id: 2, nombre: 'Bomba Vulcano BAE Perfil', precio: 129000, 
      imagen: 'https://limpiafondos.cl/wp-content/uploads/2025/06/12112100-1-Bomba-Vulcano-BAE-Perfil-600x600.webp', 
      categoria: 'Bombas', descripcion: 'Bomba autocentrante de alto rendimiento.', stock: 'in', cantidad: 1 
    },
    { 
      id: 3, nombre: 'Kit de Limpieza Piscina', precio: 36500, 
      imagen: 'https://limpiafondos.cl/wp-content/uploads/2025/06/11213202-Kit-Limpieza-Piscina-6x4-Frente-600x600.webp', 
      categoria: 'Kits', descripcion: 'Incluye manguera, pértiga y saca hojas.', stock: 'low', cantidad: 1 
    },
    { 
      id: 4, nombre: 'Cloro en Pastillas 1kg', precio: 24500, 
      imagen: 'https://limpiafondos.cl/wp-content/uploads/2025/06/11612100-1-Cloro-Pastilla-600x600.webp', 
      categoria: 'Químicos', descripcion: 'Tratamiento de agua de larga duración.', stock: 'low', cantidad: 1 
    }
  ];

  filtroNombre: string = '';
  categoriaSeleccionada: string = 'Todos';

  constructor(private cartService: CartService) {}

  get productosFiltrados() {
    return this.productos.filter(p => {
      const matchName = p.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const matchCat = this.categoriaSeleccionada === 'Todos' || p.categoria === this.categoriaSeleccionada;
      return matchName && matchCat;
    });
  }

  cambiarCantidad(prod: ProductoTienda, delta: number) {
    if (prod.cantidad + delta >= 1) {
      prod.cantidad += delta;
    }
  }

  agregar(p: ProductoTienda) {
    // Agregamos tantas veces como diga la cantidad seleccionada
    for(let i = 0; i < p.cantidad; i++) {
      this.cartService.addToCart(p);
    }
    alert(`Añadido: ${p.cantidad}x ${p.nombre}`);
    p.cantidad = 1; // Reiniciar contador
  }
}