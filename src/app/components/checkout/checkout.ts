import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CartService, Producto } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class Checkout { 

  constructor(
    public cartService: CartService, 
    private router: Router
  ) {}

  // Suma 1 a la cantidad del producto y actualiza los montos globales y badges
  subirCantidad(item: Producto) {
    this.cartService.addToCart(item);
  }

  // Resta 1 de forma segura. Si llega a 0, elimina el ítem completo automáticamente
  bajarCantidad(item: Producto) {
    const cantidadActual = item.cantidad ?? 1;
    if (cantidadActual - 1 <= 0) {
      this.cartService.removeFromCart(item.id);
    } else {
      item.cantidad = cantidadActual - 1;
      this.cartService.updateCartData();
    }
  }

  confirmarCompra() {
    const totalItems = this.cartService.getCartItems().length;
    if (totalItems > 0) {
      alert("🎉 ¡Compra confirmada! Hemos enviado los detalles a tu correo.");
      this.cartService.clearCart();
      this.router.navigate(['/']);
    }
  }
}