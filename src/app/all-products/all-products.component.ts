import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  allProducts:any=[]
constructor (private api:ApiService){}
ngOnInit(): void {
  this.getAllproducts();
}

  getAllproducts(){
    this.api.getAllproductsAPI().subscribe({
      next:(res:any)=>{
        this.allProducts=res
      },
      error:(reason:any)=>{
        console.log(reason);
      }
    })
  }

  adddToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      //proceed to wishlist
      this.api.addtowishlistAPI(product).subscribe({
        next:(res:any)=>{
          alert(`Product '${res.title}' added to your wishlist`)
        },
        error:(reason:any)=>{
          console.log(reason);
          alert(reason.error)
        }
      })
    }else{
      alert('Please Login')
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){

    }else{
      alert("Please login")
    }
  }
}
