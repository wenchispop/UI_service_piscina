import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
  cantidad?: number; // Propiedad clave para controlar las cantidades
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: Producto[] = [];
  private _cartCount = new BehaviorSubject<number>(0);
  private _total = new BehaviorSubject<number>(0);

  cartCount$ = this._cartCount.asObservable();
  total$ = this._total.asObservable();

  // Agrega un producto o incrementa su cantidad si ya existe
  addToCart(product: Producto) {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.cantidad = (existingItem.cantidad ?? 1) + 1;
    } else {
      this.cartItems.push({ ...product, cantidad: 1 });
    }
    this.updateCartData();
  }

  // Elimina completamente un producto del carrito usando su ID
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCartData();
  }

  getCartItems() { 
    return this.cartItems; 
  }

  // Permite al componente forzar una actualización cuando cambie la cantidad manualmente
  updateCartData() {
    // Cuenta total considerando la cantidad individual de cada producto
    const totalCount = this.cartItems.reduce((acc, item) => acc + (item.cantidad ?? 1), 0);
    this._cartCount.next(totalCount);
    this.updateTotal();
  }

  private updateTotal() {
    // Total de dinero considerando la multiplicación de precio * cantidad
    const total = this.cartItems.reduce((acc, item) => acc + (item.precio * (item.cantidad ?? 1)), 0);
    this._total.next(total);
  }

  clearCart() {
    this.cartItems = [];
    this._cartCount.next(0);
    this._total.next(0);
  }
}