import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css'],
})
export class UserCartComponent implements OnInit {
  allProducts: any = [];
  coupenStatus: boolean = false;
  totolaPrice: number = 0;
  coupenClickStatus:boolean = false
  constructor(private api: ApiService,private router:Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.getCart();
    }
  }

  getCart() {
    this.api.getCartAPI().subscribe({
      next: (res: any) => {
        this.allProducts = res;
        this.getCartTotal();
      },
      error: (reason: any) => {
        console.log(reason);
      },
    });
  }

  deleteItem(id: any) {
    this.api.removeCartitemAPI(id).subscribe({
      next: (res: any) => {
        this.getCart();
        this.api.getCartCount();
      },
      error: (reason: any) => {
        console.log(reason);
      },
    });
  }

  incrementQuantity(id: any) {
    this.api.incrementCartAPI(id).subscribe({
      next: (res: any) => {
        this.getCart();
        this.api.getCartCount();
      },
      error: (reason: any) => {
        console.log(reason);
      },
    });
  }

  decrementQuantity(id: any) {
    this.api.decrementCartAPI(id).subscribe({
      next: (res: any) => {
        this.getCart();
        this.api.getCartCount();
      },
      error: (reason: any) => {
        console.log(reason.error);
      },
    });
  }

  emptyCart() {
    this.api.emptyCartAPI().subscribe({
      next: (res: any) => {
        this.getCart();
        this.api.getCartCount();
      },
      error: (reason: any) => {
        console.log(reason.error);
      },
    });
  }

  getCartTotal() {
   this.totolaPrice = Math.ceil(this.allProducts
    .map((product: any) => product.totalPrice)
    .reduce((p1: any, p2: any) => p1 + p2))
  }

  getCoupen() {
    this.coupenStatus = true;
  }

  discount50(){
    this.coupenClickStatus=true;
    let discount = Math.ceil(this.totolaPrice*0.5)
    this.totolaPrice-=discount
  }

  discount20(){
    this.coupenClickStatus=true;
    let discount = Math.ceil(this.totolaPrice*0.2)
    this.totolaPrice-=discount
  }

  discount5(){
    this.coupenClickStatus=true;
    let discount = Math.ceil(this.totolaPrice*0.05)
    this.totolaPrice-=discount
  }

  checkout(){
    sessionStorage.setItem("totalPrice",JSON.stringify(this.totolaPrice))
    this.router.navigateByUrl('/checkout')
  }

}
