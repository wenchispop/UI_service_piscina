import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  categoria: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: Producto[] = [];
  private _cartCount = new BehaviorSubject<number>(0);
  private _total = new BehaviorSubject<number>(0);

  cartCount$ = this._cartCount.asObservable();
  total$ = this._total.asObservable();

  addToCart(product: Producto) {
    this.cartItems.push(product);
    this._cartCount.next(this.cartItems.length);
    this.updateTotal();
  }

  getCartItems() { return this.cartItems; }

  private updateTotal() {
    const total = this.cartItems.reduce((acc, item) => acc + item.precio, 0);
    this._total.next(total);
  }

  clearCart() {
    this.cartItems = [];
    this._cartCount.next(0);
    this._total.next(0);
  }
}