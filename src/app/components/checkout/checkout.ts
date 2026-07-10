import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Producto } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';

type ClienteTierCode = 'BRONCE' | 'ORO' | 'DIAMANTE';

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

  subtotal = 0;
  customerCode = '';
  discountRate = 0;
  discountLabel = 'Sin descuento';

  private readonly customerDiscountMap: Record<ClienteTierCode, { rate: number; label: string }> = {
    BRONCE: { rate: 0.05, label: 'Cliente Bronce' },
    ORO: { rate: 0.1, label: 'Cliente Oro' },
    DIAMANTE: { rate: 0.15, label: 'Cliente Diamante' }
  };

  constructor(
    public cartService: CartService,
    private router: Router
  ) {
    this.cartService.total$.subscribe(total => {
      this.subtotal = total;
    });
  }

  get discountAmount(): number {
    return this.subtotal * this.discountRate;
  }

  get finalTotal(): number {
    return Math.max(0, this.subtotal - this.discountAmount);
  }

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

  applyCustomerCode(inputCode?: string) {
    const normalizedCode = (inputCode ?? this.customerCode ?? '').trim().toUpperCase() as ClienteTierCode;

    if (!normalizedCode) {
      this.customerCode = '';
      this.discountRate = 0;
      this.discountLabel = 'Sin descuento';
      return;
    }

    const tier = this.customerDiscountMap[normalizedCode];

    if (!tier) {
      this.discountRate = 0;
      this.discountLabel = 'Código no válido';
      this.modalType = 'error';
      this.modalTitle = 'Código de cliente inválido';
      this.modalMessage = 'Usa uno de estos códigos: BRONCE, ORO o DIAMANTE.';
      this.modalVisible = true;
      return;
    }

    this.customerCode = normalizedCode;
    this.discountRate = tier.rate;
    this.discountLabel = tier.label;
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
    this.modalMessage = `🎉 Se ha enviado la boleta a ${emailTrim}.\nEl envío será gestionado por ChileExpress.\nDescuento aplicado: ${this.discountLabel} (${this.discountRate * 100}%).`;
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