import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelpRequest, HelpTicketListResponse, PartnerReview } from './order-help/order-help.model';
import { HttpService } from 'src/app/http.service';
import { OrderResponse } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpService) { }

createHelpRequest(data:HelpRequest):Observable<any>{
 return  this.httpClient.postWithToken(environment.Server_URL+'order/help',data)
}


getOrderTickets(orderID:string):Observable<HelpTicketListResponse[]>{
  return this.httpClient.getWithToken<HelpTicketListResponse[]>(environment.Server_URL+"order/getOrderTickets/"+orderID)
}
  getAllOrderByUserID(userId:string):Observable<OrderResponse[]>{
return this.httpClient.getWithToken<OrderResponse[]>(environment.Server_URL+"getOrder/user/"+userId);
  }


  getOrderPaymentstatus(orderID:string):Observable<string>{
    console.log("PaymentsuccessComponent getOrderPaymentstatus api: "+orderID)
    return this.httpClient.getWithToken<string>(environment.Server_URL+"order/getOrderPaymentStatus/"+orderID)
  }

  getProviderContact(providerID:string):Observable<string>{
    return this.httpClient.getWithToken<string>(environment.Server_URL+"partner/provider-contact/"+providerID)
  }

  postReview(data:PartnerReview):Observable<any>{
    return  this.httpClient.postWithToken(environment.Server_URL+'partner/genieReview',data)
   }

   getOrderReview(orderID:string):Observable<{rating:number}>{
    return this.httpClient.getWithToken<string>(environment.Server_URL+"partner/getReview/"+orderID)
  }
}
