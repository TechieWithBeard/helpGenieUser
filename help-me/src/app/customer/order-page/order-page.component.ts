import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDetailService } from '../category-detail/category-detail.service';
import { HelpTicketListResponse, PartnerReview } from './order-help/order-help.model';
import { OrderService } from './order.service';
import { AlertController } from '@ionic/angular';
import { Toast } from '@capacitor/toast';
import { OrderData } from '../model/user-data.model';
import { StorageServiceService } from 'src/app/storage-service.service';
export enum OrderStatus{
  "ORDER_PLACED" ='order placed',
  "IN_PROGRESS"="in progress",
  "COMPLETED"="completed",
  "CANCELLED"="cancelled",
  "ORDER_CONFIRMED"="order confirmed"
  
    }
@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent  implements OnInit {
  ticketList:HelpTicketListResponse[]=[]
  currentStatus:string=""
  currentorderStatus = OrderStatus; 
orderStatus!:OrderData;
  orderId!:string|null
  prividerContact:string|null=null
userID!:string;
  rating=0;
  constructor(private storage: StorageServiceService,private alertController: AlertController,public route:ActivatedRoute,public categoryService:CategoryDetailService,private router:Router,public orderService:OrderService) {
    this.orderId = this.route?.snapshot?.paramMap?.get('orderId'); // Get the ID from the route
console.log( this.orderId)
   }

  ngOnInit() {


    this.storage.get("userid")?.then(userID=>{
      if(userID){
        this.userID=userID
      }else{
        console.log("invalid user")
      }
     });


    //service/order/10e86a10-ef46-4451-ac8f-c97323f6532b
    this.getOrderDataById()

  }





  getServiceProviderContatc(providerID:string){

this.orderService.getProviderContact(providerID).subscribe(e=>{
  if(e){
    console.log("conact: "+e)
this.prividerContact=e
  }
})
  }

  getOrderDataById(){
  if(this.orderId){
    this.categoryService.getOrderStatusById(this.orderId).subscribe(e=>{
      console.log(e)
      this.orderStatus=e;
      this.getServiceProviderContatc(e.order_genie_id)
      if(this.orderId){
        this.getHelpTickets(this.orderId)
        this.getOrderRating(this.orderId)
      }

  
    })
  }
  
  }


  orderHelp(orderID: any) {
    this.router.navigate(['/home/order/help/'+orderID]);
    }


    getHelpTickets(orderID:string){
      this.orderService.getOrderTickets(orderID).subscribe(e=>{
        if(e.length>0){
          this.ticketList=[...e];
        }
      })
    }

    callGenie(){

      
      window.open('tel:'+this.prividerContact);
    }


    getStatusLabel(status: string): string {
      return this.currentorderStatus[status as keyof typeof OrderStatus];
    }






    rateProvider(rating:number){
      console.log(rating)

      const showHelloToast = async () => {
        await Toast.show({
          text: 'Thanks for the review!! 🥳🥳',
        });
      };
      let review:PartnerReview={
        service_provider_id:this.orderStatus.order_genie_id,
        user_id:this.userID,
        review_text:"",
        rating:rating,
        order_id:this.orderStatus.order_id
      }


      this.orderService.postReview(review).subscribe(r=>{
        console.log(r)
        if(r){
          showHelloToast()
        }
      })


   
    }



    getOrderRating(orderID:string){
      this.orderService.getOrderReview(orderID).subscribe(r=>{
        if(r){
          console.log(r)
          this.rating=r.rating
        }
      })
    }
}
