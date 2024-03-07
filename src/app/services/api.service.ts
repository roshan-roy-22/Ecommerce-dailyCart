import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../userModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  wishlistCount = new BehaviorSubject(0)
  SERVER_URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {
    if(sessionStorage.getItem("token")){
      this.getWishlistCount();
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

}
