import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, firstValueFrom, of } from 'rxjs';
import { SupabaseAuthSettingService } from '../supabase-auth-setting.service';
import { StorageServiceService } from '../storage-service.service';
import { from, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { FirebaseAuthentication, User } from '@capacitor-firebase/authentication';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: SupabaseAuthSettingService,
    private httpService:HttpService,
    private storageService: StorageServiceService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return EMPTY;
    // return from(this.getToken()).pipe(
    //   mergeMap((token) => {
    //     if (token) {
    //       console.log("token exist"+token)
    //       const authRequest = request.clone({
    //         setHeaders: {
    //           Authorization: `Bearer ${token}`
    //         }
    //       });

    //       // Pass the modified request to the next handler
    //       return next.handle(authRequest);
    //     } else {
    //       // Handle the case when there is no token
    //       return EMPTY;
    //     }
    //   })
    // );
  }

  async getUserData(): Promise<Observable<User | null>> {
    try {
      const result = await FirebaseAuthentication.getCurrentUser(); // Use FirebaseAuthentication to get the current user
      return of(result.user);
    } catch (error) {
      console.error('Error getting current user:', error);
      return of(null); // Return null in case of an error
    }
  }



  // async refreshToken(): Promise<boolean> {
  //   try {
  //     const user = await firstValueFrom(this.getUserData());
  
  //     if (user) {
  //       const tokenResult = await firstValueFrom(this.generateFirebaseToken(user));
  
  //       if (tokenResult) {
  //         await this.storageService.set("user_token", tokenResult);
  //         return true;
  //       } else {
  //         this.logout();
  //         return false;
  //       }
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Error refreshing token:', error);
  //     return false;
  //   }
  // }

  // getToken(): Promise<string | null> {
  //   return new Promise((resolve, reject) => {
  //     let authToken = '';
  //     this.httpService.isIdTokenValid().then((isValid) => {
  //       if (isValid) {
  //         this.storageService.get("user_token")?.then((storedToken) => {
  //           console.log("token exist storageService"+storedToken)
  //           if (storedToken) {
  //             authToken = storedToken;
  //             resolve(authToken);
  //           } else {
  //             this.authService.refreshToken().then((refreshSuccess) => {
  //               if (refreshSuccess) {
  //                 // You might want to fetch the updated token here
  //                 // and return it if available
  //                 this.storageService.get("user_token")?.then((newstoredToken) => {
  //                   if(newstoredToken){
  //                       console.log("new token created")
  //                       resolve(newstoredToken);
  //                   }
  //                   else{
  //                     console.log("disntfine the token")
  //                  reject()
  //                   }
                 
  //                 }
  //                 )
                
  //               } else {
  //                 console.log("refresh failure")
  //                 // Handle the case when refreshToken fails
  //                 reject()
  //               }
  //             });
  //           }
  //         });
  //       } else {
  //           this.authService.refreshToken().then(
  //               r=>{
  //                   if(r){
  //                       this.storageService.get("user_token")?.then((newstoredToken) => {
  //                           if(newstoredToken){
  //                               console.log("token exist")
  //                               resolve(newstoredToken);
  //                           }
  //                           else{
  //                             console.log("token doesnt exist")
  //                          reject()
  //                           }
                         
  //                         }
  //                         )   
  //                   }
  //                   else{
  //                     console.log("token refresh didnt happen")
  //                       reject()
  //                   }
  //               }
  //           );
  //         // Handle the case when the ID token is not valid
     
  //       }
  //     });
  //   });
  // }
}
