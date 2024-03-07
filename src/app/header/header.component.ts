import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
constructor (private api:ApiService){}
  ngOnInit(): void {
    if(sessionStorage.getItem("existingUser")){
      this.loginUsername=JSON.parse(sessionStorage.getItem("existingUser") || "").username.split(" ")[0]
      this.api.wishlistCount.subscribe((res:any)=>{
        this.wishlistCount=res
      })
    }else{
      this.loginUsername=""
    }
  }
loginUsername:String=""
wishlistCount:number=0


logout(){
  if(sessionStorage.getItem("existingUser")){
    sessionStorage.removeItem("existingUser")
  }
}



}
