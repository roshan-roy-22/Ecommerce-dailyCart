import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {


allProduct:any=[]
constructor(private api:ApiService){}
ngOnInit(): void {
  this.getWishlist();
}

getWishlist(){
  this.api.getAllwishlistAPI().subscribe((res:any)=>{
    this.allProduct=res
    console.log(this.allProduct);
  })
}

}
