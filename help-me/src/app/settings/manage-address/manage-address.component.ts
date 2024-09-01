import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@capacitor-firebase/authentication';
import { GoogleMap } from '@capacitor/google-maps';
import { LoadingController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { Subject, debounceTime } from 'rxjs';

import { Coordinates } from 'src/app/customer/model/user-data.model';
import { UserAddress, UserData } from 'src/app/data-model/category.model';
import { AddressData } from 'src/app/data-model/user-address-data.model';

import { ToastControllerService } from 'src/app/reusable/toast-controller/toast-controller.service';
import { UserService } from 'src/app/servcies/user.service';
import { StorageServiceService } from 'src/app/storage-service.service';
import { SupabaseAuthSettingService } from 'src/app/supabase-auth-setting.service';
import { UuidService } from 'src/app/uuid.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss'],
})
export class ManageAddressComponent  implements OnInit {

  isActionSheetOpen:boolean = false;
  selectedAddress:UserAddress|null=null
  public actionSheetButtons = [
    {
      text: 'Edit',
      role: 'destructive',
      data: {
        action: 'Edit',
      },
    },
    {
      text: 'Mark as Default',
      data: {
        action: 'Default',
      },
    },
  ];

  showPopup: boolean = false;
  searchInput: string="";
  dropdownOptions: any[]=[]; // Assuming each option has place_id and description
  selectedPlace: any = { latitude: 0, longitude: 0 }; // Default values
  locationRegistered:boolean=false;
  private searchSubject: Subject<string> = new Subject<string>();




  userID!:any;
  addressData!: UserAddress[]
  opneAddressEditor:boolean=false
  editedAddress!: UserAddress; // Initialize the editedAddress object


  mode:"update"|"add"="add"




  // registrationForm!: FormGroup;
  isOpenMaps:boolean=false;
  newMap:GoogleMap|null=null;
  markerId:string|null|undefined=""
  coordinates:Coordinates|null=null;
  apiKey = environment.GMAP_API_KEY;
   userData!:User

   isDataInvalid:boolean=false;






  constructor(public route:ActivatedRoute,public router:Router,public firebaseService:SupabaseAuthSettingService, private uuidService:UuidService,   private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,    private loadingController: LoadingController,
    private toastController: ToastControllerService,public userService:UserService,public storageService:StorageServiceService) { 



  }

  ngOnInit() {

    this.firebaseService.getUserData().then(e=>{
      if(e!=null){
        this.userData=e;
        console.log(this.userData)
  
        this.storageService.get("userDetails")?.then(e=>{
          this.userID =  e
          this.getUserAddress()
        })
  
      }
    })




  }

  getUserAddress(){
    this.userService.getUserAddress(this.userID.user_id).subscribe((result)=>{
this.addressData=result

    })
  }


  
  editAddress(address:UserAddress){

    this.mode="update"
    this.router.navigate(['/home/settings/edit-address/' + this.mode], {
      queryParams: {
        mobileNumber: address.user_phone, 
        address: address.user_address, 
        pincode: address.user_pincode, 
        landmark: address.user_nearby_landmark, 
        tag: address.user_address_tag,
      }
    });
 
  }

  addAddress(){
    this.mode="add"

    this.router.navigate(['/home/settings/edit-address/'+this.mode])
 
  }





  async presentErrorToast(message: string) {

    this.toastController.presentToast(message,"danger");
 
  }








  openMaps(){

    // this.isOpenMaps=true;

    this.router.navigate(['/register/open-map'])




  }


  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Current location',
      duration: 4000,
    });
  
    loading.present();
    
  }
  
  
  onhistoryDismiss(event:any){
    this.isOpenMaps=false;
  }
  








openAction(address:UserAddress){
  console.log(address)
  this.selectedAddress=address
  this.isActionSheetOpen=true;
}







onKeyUp(event: any): void {
  console.log(event)
  this.searchSubject.next(event.target.value);
  this.showPopup = true;
}









setDefault(address:UserAddress){
console.log(address)
  this.addressData.forEach(e=>{
    if(e.user_address_id==address.user_address_id){
      e.default=true
    }else{
      e.default=false;
    }
  })

  this.userService.EditDefaultUserAddress(this.addressData,this.userID.user_id).subscribe(r=>{
    console.log(r)
  })
  
}



actionInitiated(event:any){
  console.log("event: "+event)
  let action=event.detail.data.action
  if(action){
    if(action=="Default"){
      console.log(action)
    }else{
      if(this.selectedAddress){
        this.editAddress(this.selectedAddress)
      }
  
    }
  }
 
}














}
