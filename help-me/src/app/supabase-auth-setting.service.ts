import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
//Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Observable, firstValueFrom, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData } from './data-model/category.model';
import { StorageServiceService } from './storage-service.service';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';
import { TokenInterceptor } from './servcies/http-interceptor.service';
import { HttpService } from './http.service';
import { FirebaseAuthentication, Persistence, User } from '@capacitor-firebase/authentication';
import { Auth } from '@angular/fire/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//export const supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_ANON_KEY)
@Injectable({
  providedIn: 'root'
})
export class SupabaseAuthSettingService {
  // user$: Observable<User | null> | undefined;

  app!:FirebaseApp
  // auth!:firebase.Auth
auth = inject(Auth);
  constructor(public _httpClient:HttpService,public storageService:StorageServiceService, ) { 
    // this.user$ = this.afAuth.authState;
    if(FirebaseAuthentication){
  
      FirebaseAuthentication.setPersistence({persistence:Persistence.IndexedDbLocal})
    }
 
  
  }

  // getFirebaseAppInstance(){
 
    
  //   // Initialize Firebase
  //   this.app = initializeApp(environment.firebaseConfig);
  //   this.auth=getAuth(this.app)
  //   let analytics = getAnalytics(this.app);
  //   return this.app
  // }


  async getUserData(): Promise<User|null> {
    return new Promise(async (resolve,reject)=>{
      try {

        this.storageService.get("user_data").then(e=>{
          if(e){
            resolve(JSON.parse(e));
          }else{
            reject()
          }
        })
        
        // const result = await FirebaseAuthentication.getCurrentUser(); // Use FirebaseAuthentication to get the current user
        // console.log(result)
        // resolve(result.user);
      } catch (error) {
        console.error('Error getting current user:', error);
        reject(null); // Return null in case of an error
      }
    });
  }
  CheckUserRegistered(userID:string):Observable<UserData|null>{


return this._httpClient.getWithToken<UserData|null>(environment.Server_URL+"CheckUserRegistered/"+userID)


 
  }


  async vvv(userID:string,token:string){
    let  options= {
      url: environment.Server_URL+"CheckUserRegistered/"+userID,
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
   
 
  
  return await CapacitorHttp.get(options);

    
  }

  RegisterUser(user:UserData):Observable<any>{
return this._httpClient.postWithToken(environment.Server_URL+"registerUser",user)


  }





  // generateFirebaseToken(user: User): Observable<string> {
  //   return new Observable((observer) => {
  //     firebase.getIdToken(user, true)
  //       .then((idToken) => {
  //         console.log("id generated: " + idToken);
  //         observer.next(idToken);
  //         observer.complete();
  //       })
  //       .catch((error) => {
  //         console.error('Error generating Firebase token:', error);
  //         observer.error(null);
  //       });
  //   });
  // }


  logout():Promise<boolean>{
    return new Promise((resolve,reject)=>{


      // await FirebaseAuthentication.signOut();


      FirebaseAuthentication.signOut().then(() => {
        // Sign-out successful.
        console.log("signed out")
        this.storageService.clearAll()
        resolve(true);
      }).catch((error) => {
        // An error happened.
        console.log("unable to signed out "+error)
        reject()
      });
    })
  
  }

}
