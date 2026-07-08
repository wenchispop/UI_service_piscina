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
  modalVisible = false;
  modalTitle = '';
  modalMessage = '';
  modalType: 'success' | 'error' = 'success';

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

  confirmarCompra(email?: string) {
    const totalItems = this.cartService.getCartItems().length;
    if (totalItems <= 0) {
      this.modalType = 'error';
      this.modalTitle = 'Carrito vacío';
      this.modalMessage = 'No hay artículos en el carrito para procesar la compra.';
      this.modalVisible = true;
      return;
    }

    // Validación simple del correo
    const emailTrim = (email || '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrim || !emailRegex.test(emailTrim)) {
      this.modalType = 'error';
      this.modalTitle = 'Correo inválido';
      this.modalMessage = 'Por favor ingresa un correo electrónico válido antes de continuar.';
      this.modalVisible = true;
      return;
    }

    // Mostrar modal de éxito con la simulación de envío
    this.modalType = 'success';
    this.modalTitle = 'Compra confirmada';
    this.modalMessage = `🎉 Se ha enviado la boleta a ${emailTrim}.\nEl envío será gestionado por ChileExpress.`;
    this.modalVisible = true;
  }

  onModalConfirm() {
    if (this.modalType === 'success') {
      this.cartService.clearCart();
      this.modalVisible = false;
      this.router.navigate(['/']);
    } else {
      this.modalVisible = false;
    }
  }
}