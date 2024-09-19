import { Injectable } from '@angular/core';
import { Product } from './app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: { product: Product, quantity: number }[] = [];

  addToCart(product: Product, quantity: number) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
  }

  getCart() {
    return this.cartItems;
  }
}
