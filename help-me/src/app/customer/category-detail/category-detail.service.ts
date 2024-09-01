import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupabaseAuthSettingService } from 'src/app/supabase-auth-setting.service';
import { environment } from 'src/environments/environment';
import { CashfreeResponse } from '../model/cashfree-payment.model';
import { CashfreeCreateOrderBody, OrderDBResponse, OrderData, ServiceOrderData, ServiceProviderServiceData, StripeData, TaxData, nearByCategory } from '../model/user-data.model';
import { HttpService } from 'src/app/http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDetailService {

  constructor(public _httpClient:HttpService) { }

  public getServiceProviders(catId:string,lat:any,lng:any): Observable<any>{

    return this._httpClient.getWithToken(environment.Server_URL+"getServiceProviders?categoryID="+catId+"&lat="+lat+"&lng="+lng);
 
  
  }
  public getNearbyService(lat:any,lng:any): Observable<nearByCategory[]>{

    return this._httpClient.getWithToken<nearByCategory>(environment.Server_URL+"getNearbyService?lat="+lat+"&lng="+lng);
 
  
  }

  

  public createOrder(orderData:ServiceOrderData):Observable<OrderDBResponse>{
    return this._httpClient.postWithToken<OrderDBResponse>(environment.Server_URL+"createOrder",orderData)
  }



  public getOrderById(orderId:string):Observable<any>{
    return this._httpClient.getWithToken<any>(environment.Server_URL+"getOrder/"+orderId);
  }



  public createCashfreeOrder(data:CashfreeCreateOrderBody):Observable<CashfreeResponse>{
    return this._httpClient.postWithToken<CashfreeResponse>(environment.Server_URL+"payment/createPaymentOrder",data);
  }


  public createStriprOrder(data:StripeData):Observable<any>{
    return this._httpClient.postWithToken<any>(environment.Server_URL+"payment/create-checkout-session",data);
  }


  public getOrderStatusById(orderId:string):Observable<OrderData>{
return this._httpClient.getWithToken<OrderData>(environment.Server_URL+"getOrderStatusById/"+orderId)
  }




  public getTaxData():Observable<TaxData>{
    return this._httpClient.getWithToken(environment.Server_URL+"payment/tax")
  }



  public getServiceProviderData(providerID:string):Observable<ServiceProviderServiceData>{
    return this._httpClient.getWithToken(environment.Server_URL+'service-provider/getProviderServiceDetails/'+providerID)
  }





}
