import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { GoogleMap } from '@capacitor/google-maps';
import { Coordinates } from '../model/user-data.model';
import { Place, UserAddress, UserData } from 'src/app/data-model/category.model';
import { SupabaseAuthSettingService } from 'src/app/supabase-auth-setting.service';
// import { User } from '@firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ToastControllerService } from 'src/app/reusable/toast-controller/toast-controller.service';
import { UuidService } from 'src/app/uuid.service';
import { User } from '@capacitor-firebase/authentication';
import { environment } from 'src/environments/environment';
import { Subject, debounceTime } from 'rxjs';
import { StorageServiceService } from 'src/app/storage-service.service';
import { UserService } from 'src/app/servcies/user.service';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent  implements OnInit {
  registrationForm!: FormGroup;
  showPopup: boolean = false;
  searchInput: string="";
  dropdownOptions: any[]=[]; // Assuming each option has place_id and description
  selectedPlace: any = { latitude: 0, longitude: 0 }; // Default values
  locationRegistered:boolean=false;
  private searchSubject: Subject<string> = new Subject<string>();
placeData!:Place;

 mode:"update"|"add"|"new"="new"



  coordinates:Coordinates|null=null;
   userData!:User
userEmail:string=""
   isDataInvalid:boolean=false;
  
  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
public dbService:SupabaseAuthSettingService,
public router:Router,
public userService:UserService,
public route:ActivatedRoute,
private storageService:StorageServiceService,
private uuidService:UuidService,
    private loadingController: LoadingController,
    private toastController: ToastControllerService,
  ) {
    this.registrationForm = this.formBuilder.group({
      // name: ['', Validators.required],
      mobileNumber: ['',  Validators.compose([
        Validators.required // Makes the field required, // Validates the pattern
      ])],
      // Add more form controls for address and mobile number
      address:['', Validators.required],
      pincode:[''],
      landmark:[''],
      tag:['home']
    });
  }



  ngOnInit(): void {

    // this.searchSubject.pipe(
    //   debounceTime(2000) // Debounce for 2 seconds
    // ).subscribe(() => {
    //   this.searchPlace();
    // });

    this.dbService.getUserData().then(e=>{
      if(e){
        console.log(e)
        this.userData=e
      }

    })

    this.storageService.get("coordinates").then(r=>{
      this.userEmail=r
    })


    this.storageService.get("coordinates").then(coordinates=>{
      if(coordinates){
         this.coordinates=JSON.parse(coordinates)
         console.log("coordinates:-->"+  this.coordinates)
         if(this.coordinates)
         this.userService.getPlaceName(this.coordinates?.lat,this.coordinates?.lng).subscribe((result: any) => {
         if(result){
          this.placeData=result

          try{
            this.registrationForm.patchValue({
              pincode:   this.placeData.address.postcode// Update the pincode field with the new value
            });
          }catch(ex){
            console.log(ex)
          }
         }
        });
  
      }
     })

     try{
      let isMode= this.route?.snapshot?.paramMap?.get('mode')! as "update"|"add"|"new"|null;
      if(isMode){
       this.mode=isMode
      }
    }catch(ex){
      console.log(ex)
    }


    this.route.queryParams.subscribe(params => {
      try {
        this.registrationForm.setValue({
          mobileNumber: params['mobileNumber'] || '', 
          address: params['address'] || '', 
          pincode: params['pincode'] || '', 
          landmark: params['landmark'] || '', 
          tag: params['tag'] || '', 
        });
      } catch (ex) {
        console.log(ex);
      }
    });
    
      
  }

  ionViewWillEnter(){
    this.storageService.get("coordinates").then(coordinates=>{
      if(coordinates){
         this.coordinates=JSON.parse(coordinates)
         console.log("coordinates:-->"+  this.coordinates)
         if(this.coordinates)
         this.userService.getPlaceName(this.coordinates?.lat,this.coordinates?.lng).subscribe((result: any) => {
          if(result){
           this.placeData=result
 
           try{
             this.registrationForm.patchValue({
               pincode:   this.placeData.address.postcode// Update the pincode field with the new value
             });
           }catch(ex){
             console.log(ex)
           }
          }
         });
      }
     })
  }

  async registerUser() {
    if(!this.registrationForm.valid){
      return;
    }
    const loading = await this.loadingController.create({
      message: 'Registering user...',
    });

    await loading.present();

    // Example: Send verification code via Firebase
    const phoneNumber = this.registrationForm?.get('mobileNumber')?.value;
 if(this.coordinates&&this.userData.displayName && this.userData.email && this.userData.photoUrl && this.userData.uid){
  let userAddress:UserAddress={
    user_address_id: this.uuidService.generateSecureUuid(),
    user_phone:phoneNumber,
  default:true,
    user_coordinates:this.coordinates,
    user_address:this.registrationForm?.get('address')?.value,
    user_pincode:this.registrationForm?.get('pincode')?.value,
    user_nearby_landmark:this.registrationForm?.get('landmark')?.value,
    user_address_tag:this.registrationForm?.get('tag')?.value,
  }
    let userData:UserData={
      user_name:this.userData.displayName,
      user_address:[userAddress],
      user_email:this.userData.email,
      user_phone:this.registrationForm?.get('mobileNumber')?.value,
      user_image:this.userData.photoUrl,
      user_id:this.userData.uid,
      user_type:"USER"

    }


    console.log(userData)
    if(this.mode=="add"){
      this.userService.addNewUserAddres(userAddress,this.userData.uid).subscribe(result=>{
        loading.dismiss().then(r=>{
          this.router.navigate(['/home/settings/manage-address'])

        })
      })
    }else if(this.mode=="update"){
      this.userService.updateUserAddres(userAddress,this.userData.uid).subscribe(async e=>{
        loading.dismiss().then(r=>{
    
          this.router.navigate(['/home/settings/manage-address'])
        })
          console.log(e)
        })
    }else{
      this.dbService.RegisterUser(userData).subscribe(e=>{
        console.log(e)
        if(e==null){
          // Swal.fire({
          //   icon: "error",
          //   title: "Oops...",
          //   text: "Something went wrong! Please try again",
          // });
          loading.dismiss().then(r=>{
            this.toastController.presentToast("Something went wrong. Please try again!","warning");
  
          })
        }else{
          loading.dismiss().then(r=>{
        
            this.router.navigate(['/home'])
          });
        }
      
  
      })
    }
 
   
  }
  else{
      console.log("invalid data");
      this.registrationForm.disable({onlySelf:true});
      this.isDataInvalid=true;
      this.toastController.presentToast("Invalid Data. Please try again!","warning");
  }

  }

  async presentErrorToast(message: string) {

    this.toastController.presentToast(message,"danger");
 
  }



// openMaps(){

//   this.isOpenMaps=true;
// }

openMaps(){
  this.router.navigate(['/register/open-map/'+this.mode])
}









async showLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Loading Current location',
    duration: 4000,
  });

  loading.present();
  
}


onKeyUp(event: any): void {
  console.log(event)
  this.searchSubject.next(event.target.value);
  this.showPopup = true;
}



// searchPlace(){
//   let autocompleteService = new google.maps.places.AutocompleteService();

//   autocompleteService.getPlacePredictions({ input: this.searchInput },(predictions, status)=> {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       // Populate dropdown with predictions
//       this.dropdownOptions=[]

//       predictions?.forEach((prediction) =>{
//         const option = document.createElement('option');
//         option.value = prediction.place_id;
//         option.textContent = prediction.description;
//         this.dropdownOptions.push(option);
//       });
//     }
//   });


// }



onhistoryDismiss(event:any){
  // this.isOpenMaps=false;
}


navigatetoLogin(){
  this.router.navigate(['/login'])
}
}
