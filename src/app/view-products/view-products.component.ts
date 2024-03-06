import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  product:any={}
  constructor(private route:ActivatedRoute,private api:ApiService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id} =res
      this.getProduct(id)
    })
  }

  getProduct(pid:any){
    this.api.viewProductAPI(pid).subscribe((res:any)=>{
      this.product=res
      console.log(this.product);
    })
  }
}
