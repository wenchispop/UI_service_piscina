import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService, Producto } from '../../services/cart.service'; // Asegura estas rutas
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit {
  esAdmin = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService // Inyectamos el servicio
  ) {}

  ngOnInit() {
    this.authService.isAdmin$.subscribe(status => {
      this.esAdmin = status;
    });
  }

  agregarAlCarro(nombre: string, precio: number, imagen: string) {
    const producto: Producto = {
      id: Date.now(),
      nombre: nombre,
      precio: precio,
      imagen: imagen,
      categoria: 'Insumos'
    };
    this.cartService.addToCart(producto);
  }
}