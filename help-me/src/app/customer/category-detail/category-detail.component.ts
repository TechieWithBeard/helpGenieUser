import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDetailService } from './category-detail.service';
import { Storage } from '@ionic/storage-angular';
import { CashfreeCreateOrderBody, Coordinates, ServiceOrderData, StripeData, StripeLineItem, TaxData, UserCheckoutData } from '../model/user-data.model';
import { StorageServiceService } from 'src/app/storage-service.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/servcies/user.service';
import { UserAddress } from 'src/app/data-model/category.model';
import { IonDatetime, LoadingController, Platform } from '@ionic/angular';
// import { Plugins } from '@capacitor/core';



@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent  implements OnInit {


  openServiceDetail:boolean=false;
  serviceProviderCategory!:string|null
  serviceProviderData:any[]=[]
  serviceList:any[]=[];
  selectedProviderData!:any;
  openOrderSummaryDetail:boolean=false;

  before_total:number=0
  totalAmount:number=0;
  total:number=0;
  gst_charge:number=0;
  taxData!:TaxData;
  // stripe:Stripe|null=null
  
  providerLoadingStatus:"LOADING"|"LOADED"|"ERROR"="LOADING"
  DefaultaddressData: UserAddress[]=[]
  
  constructor(public platform:Platform,public userService:UserService,private storage: StorageServiceService,public router:Router, private route: ActivatedRoute,private categoryDetailService:CategoryDetailService) { 

  
  }

  ngOnInit() {
   this.serviceProviderCategory = this.route?.snapshot?.paramMap?.get('categoryID'); // Get the ID from the route
 this.storage.get("userid")?.then(userID=>{
  if(userID){
    this.getUserAddress(userID).then(e=>{
      if(e){
        this.getServiceProvidersData(e)
      }
 
     })
  }else{
    console.log("invalid user")
  }
 });



 this.categoryDetailService.getTaxData().subscribe(r=>{
  console.log(r);
  this.taxData=r
 })
  

  }


  getServiceProvidersData(userCoordinates:Coordinates){
    if(this.serviceProviderCategory){
      this.providerLoadingStatus="LOADING"

      this.categoryDetailService.getServiceProviders(this.serviceProviderCategory,userCoordinates.lat,userCoordinates.lng).subscribe(e=>
        {
          if(e)
          {
            this.serviceProviderData=[...e]
            this.serviceList=[...e]

            console.log(this.serviceList)
            this.providerLoadingStatus="LOADED"
          }
        },error=>{
          this.providerLoadingStatus="ERROR"
          this.serviceProviderData=[]
          this.serviceList=[]
        })
    }
  }




  selectProvider(providerData:any){
this.router.navigateByUrl('/home/service/provider/'+providerData.service_provider_id)
  }








  wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


navigateTohome(){
  this.router.navigate(["/home"])
}


  getUserAddress(userID:string):Promise<Coordinates|null>{
    return new Promise((resolve,reject)=>{
      this.userService.getUserAddress(userID).subscribe((result)=>{
        this.DefaultaddressData=result
        let item=this.DefaultaddressData.find(e=>e.default)
        if(item){
          resolve(item.user_coordinates)
        }
        else{
reject();
        }
      
        console.log(this.DefaultaddressData)
    },error=>{
      reject()
      console.log(error);
    })


    })
  }





   
onWillDismiss(event:any){
  this.openOrderSummaryDetail=false;
}



cancel(){
  // this.openServiceDetail=false;
  this.selectedProviderData=undefined
}








}



