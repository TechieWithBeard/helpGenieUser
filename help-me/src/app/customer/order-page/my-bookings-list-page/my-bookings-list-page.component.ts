import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { UserCheckoutData } from '../../model/user-data.model';
import { StorageServiceService } from 'src/app/storage-service.service';
import { Router } from '@angular/router';
import { OrderStatus } from '../order-page.component';

@Component({
  selector: 'app-my-bookings-list-page',
  templateUrl: './my-bookings-list-page.component.html',
  styleUrls: ['./my-bookings-list-page.component.scss'],
})
export class MyBookingsListPageComponent  implements OnInit {

  constructor(private orderService:OrderService,private storage: StorageServiceService,private router:Router) { }
  currentorderStatus = OrderStatus; 
  orderList:any[]=[]
  loading:boolean=false;
  ngOnInit() {
this.getAppOrder();
  }

  async getAppOrder(){
    this.loading=true
    let data:UserCheckoutData=  await this.storage.get('userDetails');
    if(data){
      let userId=data.user_id;
      this.orderService.getAllOrderByUserID(userId).subscribe(e=>{
        if(e){
          console.log(e)
          this.loading=false
          this.orderList=[...e.sort((a, b) => {
            const dateA = new Date(a.order_date);
            const dateB = new Date(b.order_date);
            return dateB.getTime() - dateA.getTime();
        })]
        }

      })

    }
  
  }


  orderClicked(ordeer_id:string){

this.router.navigateByUrl('/home/order/'+ordeer_id);

  }

  getStatusLabel(status: string): string {
    return this.currentorderStatus[status as keyof typeof OrderStatus];
  }


}
