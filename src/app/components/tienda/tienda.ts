import { Component, OnInit } from '@angular/core'; // 1. Agregamos OnInit
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, Producto } from '../../services/cart.service';
import { ActivatedRoute } from '@angular/router'; // 2. Importamos ActivatedRoute

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
export class TiendaComponent implements OnInit { // 3. Añadimos "implements OnInit"
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
    },
    { 
      id: 5, nombre: 'Robot Limpiafondos Dolphin E10', precio: 599000, 
      imagen: 'https://perfectpool.cl/wp-content/uploads/2024/05/DOLPHIN-S200-1.webp', 
      categoria: 'Robots', descripcion: 'Aspiración e instalación automatizada para el fondo de la piscina.', stock: 'in', cantidad: 1 
    },
    { 
      id: 6, nombre: 'Robot Autónomo Aquabot X4', precio: 749000, 
      imagen: 'https://perfectpool.cl/wp-content/uploads/2025/12/125626766-1.webp', 
      categoria: 'Robots', descripcion: 'Limpia fondo, paredes y línea de flotación de forma inteligente.', stock: 'in', cantidad: 1 
    },
    { 
      id: 7, nombre: 'Alguicida Concentrado 5L (Oferta)', precio: 14900, 
      imagen: 'https://www.tiendaprolim.cl/wp-content/uploads/2024/02/ALPS20C.jpg', 
      categoria: 'Ofertas', descripcion: 'Elimina y previene la formación de algas. ¡30% de descuento!', stock: 'in', cantidad: 1 
    },
    { 
      id: 8, nombre: 'Foco LED Subacuático RGB (Oferta)', precio: 45000, 
      imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_689545-MLA100067632123_122025-F.webp', 
      categoria: 'Ofertas', descripcion: 'Iluminación multicolor de bajo consumo para tu piscina.', stock: 'low', cantidad: 1 
    }
  ];

  filtroNombre: string = '';
  categoriaSeleccionada: string = 'Todos';

  // 4. Inyectamos "route" en el constructor para poder usarlo
  constructor(private cartService: CartService, private route: ActivatedRoute) {}

  // 5. Creamos el método ngOnInit que se ejecuta automáticamente al abrir la tienda
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Si en la URL viene ?Ofertas=true, cambiamos la categoría seleccionada a 'Ofertas'
      if (params['Ofertas'] === 'true') {
        this.categoriaSeleccionada = 'Ofertas';
      }
    });
  }

  // Tu lógica de filtrado automática se mantiene igual y ahora funcionará sola
  get productosFiltrados() {
    return this.productos.filter(p => {
      const matchName = p.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const matchCat = this.categoriaSeleccionada === 'Todos' || p.categoria === this.categoriaSeleccionada;
      return matchName && matchCat;
    });
  }

  cambiarCantidad(producto: ProductoTienda, cambio: number) {
    const nuevaCantidad = producto.cantidad + cambio;
    if (nuevaCantidad >= 1) {
      producto.cantidad = nuevaCantidad;
    }
  }

  agregar(producto: ProductoTienda) {
    for (let i = 0; i < producto.cantidad; i++) {
      this.cartService.addToCart({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        categoria: producto.categoria
      });
    }
    producto.cantidad = 1;
  }
}