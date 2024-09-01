import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.scss'],
})
export class PaymentsuccessComponent  implements OnInit {
  orderId!:string|null
paymentStatus:string=""
countdown: number = 5;

  constructor(public route:ActivatedRoute,public orderService:OrderService,private router:Router) { 

    this.orderId = this.route?.snapshot?.paramMap?.get('orderId');
    console.log("PaymentsuccessComponent this is order id: "+this.orderId)
  }

  ngOnInit() {
    console.log("PaymentsuccessComponent ngOnInit: "+this.orderId)
   
  }

  ngAfterViewInit(){
    console.log("PaymentsuccessComponent ngAfterViewInit: "+this.orderId)
    this.getOrderStatus()
  }


  getOrderStatus(){
    if(this.orderId){
      console.log("PaymentsuccessComponent orderId: "+this.orderId)
      this.orderService.getOrderPaymentstatus(this.orderId).subscribe(r=>{
        console.log(r)
        this.paymentStatus=r
        console.log("PaymentsuccessComponent paymentStatus: "+r)
        this.startTimer(r);
       
      },error=>{
        console.log("PaymentsuccessComponent error: "+JSON.stringify(error))
      })
    }
  
  }

  playAudio() {
    const audio = new Audio('assets/sounds/success.mp3');
    audio.play();
  }
  startTimer(r:string) {
    this.playAudio()
    console.log("startTimer: "+r)
    const intervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(intervalId);
        if(r=="SUCCESS"){
          this.router.navigate(['/home/order/'+ this.orderId])
        }else{
          this.router.navigate(['/home'])
        }
      }
    }, 1000);
  }


  redirectToHome() {
    this.router.navigateByUrl('/home');
  }


}
