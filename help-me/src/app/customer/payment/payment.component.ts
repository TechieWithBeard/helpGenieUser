import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var Cashfree: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent  implements OnInit {
  cashfree!:any;
  cardComponent:any;
paymentData={
  "cf_order_id": 2153657997,
  "created_at": "2024-02-11T16:34:20+05:30",
  "customer_details": {
      "customer_id": "fS9oQQMKC3TLkUEFw4wTnEvr91A3",
      "customer_name": null,
      "customer_email": "vishnunadaar111@gmail.com",
      "customer_phone": "8373923785",
      "customer_uid": null
  },
  "entity": "order",
  "order_amount": 430,
  "order_currency": "INR",
  "order_expiry_time": "2024-03-12T16:34:20+05:30",
  "order_id": "7cb5beb7-7b57-4ebb-8fa3-1ae45425f561",
  "order_meta": {
      "return_url": "http://localhost:8100/home/home/service/category/Electrition",
      "notify_url": null,
      "payment_methods": null
  },
  "order_note": null,
  "order_splits": [],
  "order_status": "ACTIVE",
  "order_tags": null,
  "payment_session_id": "session_Y2WRyWyYR_bAIzGP04ZNSpRsXbEHH90sqnKZ_p2NvOQkUqS4jwj4OaujDFL3-HZOGHqn-iB3-EiU1aHttTbngvgxrAbCyPRll3FXDa2yLdsJ",
  "payments": {
      "url": "https://sandbox.cashfree.com/pg/orders/7cb5beb7-7b57-4ebb-8fa3-1ae45425f561/payments"
  },
  "refunds": {
      "url": "https://sandbox.cashfree.com/pg/orders/7cb5beb7-7b57-4ebb-8fa3-1ae45425f561/refunds"
  },
  "settlements": {
      "url": "https://sandbox.cashfree.com/pg/orders/7cb5beb7-7b57-4ebb-8fa3-1ae45425f561/settlements"
  },
  "terminal_data": null
}
  constructor() { }

  ngOnInit() {


  
   this.cashfree =  Cashfree({
      mode: environment.production?'sandbox':'sandbox', // or 'PRODUCTION'
    });  
  // const mode = 'sandbox'; 
  // const initializedCashfree = (window as any)['Cashfree'];
  // if (initializedCashfree) {
  //   initializedCashfree.init({ mode });
  // }
     this.cardComponent = this.cashfree.create("cardNumber", {});
		 this.cardComponent.mount("#cardNumber");

		const cardCvv = this.cashfree.create("cardCvv", {});
		cardCvv.mount("#cardCvv");

		const cardExpiry = this.cashfree.create("cardExpiry", {});
		cardExpiry.mount("#cardExpiry");

		const cardHolder = this.cashfree.create("cardHolder", {});
		cardHolder.mount("#cardHolder");
  
		const upiAppComponent = this.cashfree.create("upiApp", {
			values: {
				upiApp: "phonepe",
				buttonText: "PhonePe",
				buttonIcon: true
			}
		});
		upiAppComponent.mount("#upiAppComponent");


}


pay(){

    this.cashfree.pay({
      paymentMethod:  this.cardComponent,
      paymentSessionId: this.paymentData.payment_session_id,
      returnUrl: environment.LOGIN_REDIRECT+"/order/payment-status/"+this.paymentData.order_id,
    }).then( (data:any)=> {
      if (data != null && data.error) {
        return this.showError(data.error)
      }
    });

  
}


showError = (e:any)=>{
  alert(e.message)
}


}
