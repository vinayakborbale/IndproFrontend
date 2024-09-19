import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth.service';
import { CartService } from 'src/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit ,AfterViewInit{
  cartItems = [
    { productName: 'Product 1', quantity: 1, price: 10.00 },
    { productName: 'Product 2', quantity: 2, price: 15.00 },
    { productName: 'Product 3', quantity: 1, price: 20.00 }
  ];

  totalPrice: number = 0;
  cartDatList: any[]=[];
  totalQuantity:number=0;
  totalPriceOfTheItems:number=0;
  OrderDataList:any[]=[];
  constructor(private router: Router, private auth: AuthService) {
   
  }
  ngAfterViewInit(): void {
  console.error(this)
  }
  ngOnInit(): void {
    const dataValue:any[]=[];
    this.auth.getAllOrders().subscribe((data: any) => {
    this.cartDatList=data;
      });
     
  
    // this.totalPrice = this.cartDatList.reduce((acc, item) => acc + (item.price), 0);
    // this.totalPriceOfTheItems=this.cartDatList.reduce((acc, item) => acc + (item.count * item.price), 0);
    // this.totalQuantity=this.cartDatList.reduce((acc, item) => acc + (item.count), 0);

  }

  

  proceedToCheckout(price:any) {
    alert(`Proceeding to checkout with total price:`+price);
  }
  getDataByID(orderId:any){
    this.auth.getOrdersById(orderId).subscribe((value:any)=>{
      this.OrderDataList=value;
      console.log(value)
    });
  }
}

