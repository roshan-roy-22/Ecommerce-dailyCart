import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../userModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  searchTerm = new BehaviorSubject("")
  cartCount = new BehaviorSubject(0)
  wishlistCount = new BehaviorSubject(0)
  SERVER_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount();
      this.getCartCount();
    }
  }

  getAllproductsAPI() {
    return this.http.get(`${this.SERVER_URL}/all-products`);
  }
  
  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/login`,user)
  }

  viewProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/view-product/${id}`)
  }

  appendTokenHeader(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addtowishlistAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-wishlist`,product,this.appendTokenHeader())
  }

  getAllwishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/get-wishlist`,this.appendTokenHeader())
  }

  getWishlistCount(){
    this.getAllwishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  removeWishlistItemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/remove-wishlist/${id}`,this.appendTokenHeader())
  }

  addtoCartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/add-to-cart`,product,this.appendTokenHeader())
  }

  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/get-cart`,this.appendTokenHeader())
  }

  getCartCount(){
    this.getCartAPI().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }

  removeCartitemAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/remove-cart/${id}`,this.appendTokenHeader())
  }

  incrementCartAPI(id: any) {
    return this.http.get(`${this.SERVER_URL}/cart-inc/${id}`, this.appendTokenHeader())
  }

  decrementCartAPI(id: any) {
    return this.http.get(`${this.SERVER_URL}/cart-decrement/${id}`, this.appendTokenHeader())
  }

  emptyCartAPI() {
    return this.http.delete(`${this.SERVER_URL}/empty-cart`, this.appendTokenHeader())
  }

  isLoggedIn(){
    return !!sessionStorage.getItem("token")
  }

}
