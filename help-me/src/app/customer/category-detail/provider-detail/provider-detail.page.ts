import { Component, OnInit } from '@angular/core';
import { CategoryDetailService } from '../category-detail.service';
import { CashfreeCreateOrderBody, ServiceOrderData, ServiceProviderServiceData, TaxData, UserCheckoutData } from '../../model/user-data.model';
import { StorageServiceService } from 'src/app/storage-service.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var Cashfree: any;
import {CFEnvironment, CFPaymentGateway, CFSession, CFTheme, CFWebCheckoutPayment, CFWebTheme} from '@awesome-cordova-plugins/cashfree-pg'
import { environment } from 'src/environments/environment';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.page.html',
  styleUrls: ['./provider-detail.page.scss'],
})
export class ProviderDetailPage implements OnInit {
  // instagramHandle: string = 'the_curiousindian';

  taxData!:TaxData;
  selectedProviderData!:ServiceProviderServiceData|null;
  providerID!:string
  before_total:number=0
  totalAmount:number=0;
  total:number=0;
  gst_charge:number=0;
  openOrderSummaryDetail:boolean=false;
  scheduleDate:string=new Date().toString();
  service_data_list:any[]=[]
  paymnetLoading!:any;
  min_date:String=new Date().toISOString();
  max_date:String=new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
  constructor(public platform:Platform,private loadingCtrl: LoadingController,public router:Router,private categoryDetailService:CategoryDetailService,private storage: StorageServiceService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.providerID = this.route?.snapshot?.paramMap?.get('providerID')!; // Get the ID from the route
 
    this.getProviderDetails()

   }
 

  getProviderDetails(){
    this.categoryDetailService.getServiceProviderData(this.providerID ).subscribe(r=>{
      console.log(r)
      this.selectProvider(r)
    })
  }

  selectProvider(providerData:any){
     this.categoryDetailService.getTaxData().subscribe(r=>{
      console.log(r);
      this.taxData=r
    
     })
    this.selectedProviderData=providerData;
    this.selectedProviderData?.service_provider_domain?.map((e:any)=>{
      e.count=0;
      return e;
    })
    console.log(this.selectedProviderData)
    
   
      }



      bookAppointment(providerData:any){
        if(this.taxData==null){
          console.log("unable to fetch tax data")
          return
        }
    this.service_data_list.map(r=>{
      r.total_price=r.count*r.rate;
      return r;
    })
    
     const totalCount=this.service_data_list.reduce((accumulator, currentValue) => accumulator + currentValue.total_price, 0);
    const roundedTotalCount = Math.round(totalCount * 100) / 100; 
    
    const gst = (roundedTotalCount * this.taxData.Tax) / 100;
    // const serviceCharge = this.taxData.service_charge;
    this.before_total=roundedTotalCount;
    // this.gst_charge=gst + serviceCharge
     this.total=Math.floor(roundedTotalCount);
    this.total=Math.floor(roundedTotalCount+ gst);
    
    this.totalAmount=roundedTotalCount
    this.openOrderSummaryDetail=true;
      }
    


      dateChanged(date:any){
        console.log(date)
        console.log(date.detail.value)
        this.scheduleDate=date.detail.value;
          }
        



  increaseCount(service_data:any) {
    console.log(this.service_data_list)
        let indexToRemove=this.service_data_list.findIndex(e=>e==service_data)
        if(indexToRemove>=0){
          this.service_data_list[indexToRemove].count++;
        }
        else{
          service_data.count++;
          this.service_data_list.push(service_data)
        }
    
      }
    
      decreaseCount(service_data:any) {
        let indexToRemove=this.service_data_list.findIndex(e=>e==service_data)
        if(indexToRemove>=0){
          this.service_data_list.splice(indexToRemove, 1)
        }
    if(service_data.count>0){
      service_data.count--
    }
    
      }
    


      confirm(){
        if(this.taxData==null){
          console.log("unable to fetch tax data")
          return
        }
    // console.log(this.service_data_list)
    this.service_data_list.map(r=>{
      r.total_price=r.count*r.rate;
      return r;
    })
    
    const totalCount=this.service_data_list.reduce((accumulator, currentValue) => accumulator + currentValue.total_price, 0);
    const roundedTotalCount = Math.round(totalCount * 100) / 100; 
    
    // const gst = (roundedTotalCount * this.taxData.Tax) / 100;
    // const serviceCharge = this.taxData.service_charge;
    // this.before_total=roundedTotalCount;
    // this.gst_charge=gst + serviceCharge
    this.total=Math.floor(roundedTotalCount);
    this.totalAmount=roundedTotalCount
    this.openOrderSummaryDetail=true;
      }
    
    
      cancel(){
        // this.openServiceDetail=false;
        this.selectedProviderData=null
      }
    
      onWillDismiss(event:any){
        this.openOrderSummaryDetail=false;
      }
    
    
      closeSummary(){
        this.openOrderSummaryDetail=false;
      }
    
      async confirmPayment(){
        this.showLoading();
      let data:UserCheckoutData=  await this.storage.get('userDetails');
      if(data &&this.selectedProviderData){
        let orderData:ServiceOrderData={
          "order_value":this.taxData.service_charge,
          // "order_provider_value":this.totalAmount,
          "order_provider_value":this.totalAmount?this.totalAmount:this.selectedProviderData.consultation_fees ,
          "order_items":this.service_data_list,
          "order_user_id":data.user_id,
          "order_genie_id":this.selectedProviderData.service_provider_id,
          "order_date":new Date(this.scheduleDate),
          "order_status":"Initiated",
          "order_payment_id":null,
          "order_address":data.user_address[0]
        }
      
        console.log(orderData)
        this.openOrderSummaryDetail=false;
        if(orderData?.order_value){
          this.categoryDetailService.createOrder(orderData).subscribe(orderDataResponse=>{
            console.log(orderDataResponse)
            let phoneNumber:string=data.user_phone.toString()
            if (phoneNumber.startsWith("91")) {
               phoneNumber = phoneNumber.substring(2); // Remove the first two characters (i.e., "91")
              console.log(phoneNumber); // Output: "8373923785"
            } else {
              console.log(phoneNumber); // No "91" prefix found, so the number remains unchanged
            }
    
    
            let cf_create_order:CashfreeCreateOrderBody={
              "customer_details":{
                "customer_email":data.user_email,
                "customer_id":orderData.order_user_id,
                "customer_phone":phoneNumber,
              },
              "order_amount":orderData.order_value,
              "order_id":orderDataResponse.order_id,
              "order_currency":"INR",
              "order_meta":{
                // "return_url": environment.LOGIN_REDIRECT+"/order/payment-status/"+result.order_id,
              }
    
            }
    
    
            // let orderItems:StripeLineItem[]=this.service_data_list.map(r=>{
            //   return {
            //     price_data:{
            //       currency:'inr',
            //       product_data:{
            //         name:r.service_name
            //       },
            //       unit_amount:r.rate*100
            //     },
            //     quantity:r.count,
            //     tax_rates:['txr_1O2eBDSBaDih0KuDBzBHJetT']
            //   }
            // })
            // let stripeOrder:StripeData={
            //   line_items:orderItems,
            //   metadata:{
            //     order_id:orderData.order_id
            //   },
            //   mode:'payment',
            //   success_url:environment.LOGIN_REDIRECT+"/order/"+orderData.order_id,
            //   cancel_url: environment.LOGIN_REDIRECT+"/order/"+orderData.order_id,
            // }
    
    
    
            try{
              if(this.paymnetLoading){
                this.paymnetLoading.dismiss()
              }
            }catch(ex){
              console.error(ex)
            }
          
    
    
         
           
    
    
    
    
            this.categoryDetailService.createCashfreeOrder(cf_create_order).subscribe(async result=>{
              console.log(result)
    
              if(result){
                // console.log(result.url.toString())
                // window.open(result.url.toString(), '_self')
                // window.location.href = result.url;
              }
              let paymentSessionId=result.payment_session_id;
              console.log(paymentSessionId)
    
              const cashfree = new Cashfree({
                mode: environment.production?'production':'sandbox', // or 'PRODUCTION'
              });
             
              let checkoutOptions = {
                paymentSessionId:paymentSessionId,
                returnUrl: environment.LOGIN_REDIRECT+"/order/payment-status/"+result.order_id,
                
            }
    
    
          const session = new CFSession(paymentSessionId,result.order_id,environment.production?CFEnvironment.PRODUCTION:CFEnvironment.SANDBOX);
    
    // Create an instance of CFWebTheme or pass null if it's nullable
    const theme = null// or null
    
    // Create an instance of CFWebCheckoutPayment
    const checkoutPayment = new CFWebCheckoutPayment(session, theme);
    
    
    // this.router.navigateByUrl("/home/order/payment-status/"+result.order_id,{skipLocationChange:true,replaceUrl:true})
    
    
    const callbacks = {
      onVerify: (result:any)=> {
        let details = {
          "orderID": result.orderID
        }
        console.log("********* payment response"+details);
        console.log("********* payment response"+JSON.stringify(result));
     this.router.navigateByUrl("/home/order/payment-status/"+result.orderID,{skipLocationChange:true,replaceUrl:true})
    
      },
       onError: (error:any)=>{
         let errorObj = {
           "orderID": result.order_id,
           "status": error.status,
           "code": error.code,
           "type": error.type,
           "message": error.message
         }
         console.log(errorObj);
       }
    }
    
    const isMobile = () => {
      return /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
    }
    
    if(isMobile()){
    
      CFPaymentGateway.setCallback(callbacks)
        
    
      CFPaymentGateway.doWebCheckoutPayment(checkoutPayment)
    
    }else{
      console.log("in web app payment")
      cashfree.checkout(checkoutOptions).then((result:any)=>{
        if(result.error){
            alert(result.error.message)
        }
        if(result.redirect){
            console.log("Redirection")
           this.router.navigateByUrl("/home/order/payment-status/"+result.orderID,{skipLocationChange:true,replaceUrl:true})

    
        }
    });
    
      
    } 
            })
    
    
          })
        }
          
      }else{
        console.log("error in user data");
        this.router.navigate(['/login'])
      
      }
    
    
    
    
      }
    
      


      async showLoading() {
        this.paymnetLoading= await this.loadingCtrl.create({
          message: 'Initializing payment..',
          duration:4000
        });
    
        this.paymnetLoading.present();
      }

}
