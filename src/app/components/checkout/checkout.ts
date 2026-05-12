import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CartService } from '../../services/cart.service';
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

  confirmarCompra() {
    // Aquí puedes simular un proceso de carga
    const total = this.cartService.getCartItems().length;
    if (total > 0) {
      alert("🎉 ¡Compra confirmada! Hemos enviado los detalles a tu correo.");
      this.cartService.clearCart();
      this.router.navigate(['/']);
    }
  }
}