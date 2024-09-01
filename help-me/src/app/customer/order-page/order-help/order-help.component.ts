import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDetailService } from '../../category-detail/category-detail.service';
import { HelpRequest, HelpTicketListResponse } from './order-help.model';
import { OrderService } from '../order.service';
import { ToastControllerService } from 'src/app/reusable/toast-controller/toast-controller.service';

@Component({
  selector: 'app-order-help',
  templateUrl: './order-help.component.html',
  styleUrls: ['./order-help.component.scss'],
})
export class OrderHelpComponent  implements OnInit {
  helpTitle: string = '';
  helpDescription: string = '';
  isAlertOpen:boolean=false;
  orderId!:string|null

  alertButtons = ['OK'];
  constructor(public loaderService:ToastControllerService,public route:ActivatedRoute,public orderService:OrderService,private router:Router) { 
    this.orderId = this.route?.snapshot?.paramMap?.get('orderId');
  }

  ngOnInit() {}


  sendHelp(){
    this.loaderService.showLoading("Issue Raised Successfully")
if(this.orderId!=null){
  let oderData:HelpRequest={
    order_id:this.orderId,
    query_title:this.helpTitle,
    query_description:this.helpDescription

  }

  this.orderService.createHelpRequest(oderData).subscribe(e=>{

    console.log(e);
    if(e){
      this.helpTitle="";
      this.helpDescription="";
        this.setOpen(true)
    }
  })

}



 
  }




  setOpen(isOpen: boolean) {
    this.loaderService.dismissLoading().then(r=>{
      this.router.navigate(['/home/order/'+this.orderId]);
    })
    // this.isAlertOpen = isOpen;
    // if(isOpen){
     
    // }else{
    //   // this.router.navigateByUrl('/home/order/'+this.orderId);
    // }

  }
}
