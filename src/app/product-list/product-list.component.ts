import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth.service';
import { ProductService } from 'src/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  cartList: any[] = [];

  constructor(private productService: ProductService, private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }

  addToCart(product: any): void {
    // Logic to add the product to the shopping cart
    console.log('Product added to cart:', product);
    this.cartList.push(product)
  }
  navigateToCart() {
    // this.auth.setCartData(this.cartList);
    const cartDatList = this.cartList.reduce((acc, current) => {
      const existingProduct = acc.find((product: any) => product.id === current.id);
      if (existingProduct) {
        existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      } else {
        acc.push({
          productId: current.id, // Add the product ID
          ...current,
          quantity: 1
        });
      }
      return acc;
    }, []);

    this.auth.postCreateOrder(cartDatList).subscribe((data: any) => {
      console.warn(data)
    });
    this.router.navigate(['/', 'cart']);
  }
}
