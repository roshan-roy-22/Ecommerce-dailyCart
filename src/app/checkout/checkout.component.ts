import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {

  totalAmount:string=""
  public payPalConfig ? : IPayPalConfig;
  checkoutStatus: boolean = false;
  checkoutForm = this.fb.group({
    username: ['', [Validators.pattern('[a-zA-Z]*'), Validators.required]],
    address: ['', [Validators.pattern('[a-zA-Z0-9]*'), Validators.required]],
    pincode: ['', [Validators.pattern('[0-9]*'), Validators.required]],
  });
  constructor(private fb: FormBuilder,private toaster:ToastrService,private api:ApiService,private router:Router) {}

  cancel() {
    this.checkoutForm.reset();
  }

  proceedTobuy() {
    if (this.checkoutForm.valid) {
      this.checkoutStatus = true;
      if(sessionStorage.getItem("totalPrice")){
        this.totalAmount=sessionStorage.getItem("totalPrice") || ""
        this.initConfig()
      }
    }
    else alert('Invalid Form');
  }

  initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.totalAmount,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.totalAmount
                        }
                    }
                }
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any )=> {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.api.emptyCartAPI().subscribe((res:any)=>{
                this.api.getCartCount();
                this.toaster.success("Successfully completed payement ...Than you for purchasing with us")
                this.checkoutStatus=false;
                this.checkoutForm.reset();
                this.router.navigateByUrl("/")
            })
          
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.toaster.warning("Your Trancsaction have been canceled")
            this.checkoutStatus=false;
        },
        onError: err => {
            console.log('OnError', err);
            this.toaster.warning("Transaction have an error please try later")
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
}
}
