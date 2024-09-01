import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Observable, catchError, from, mergeMap, of, throwError } from 'rxjs';
import { StorageServiceService } from './storage-service.service';
import { jwtDecode } from "jwt-decode";
import { FirebaseAuthentication, Persistence } from '@capacitor-firebase/authentication';
import { Platform } from '@ionic/angular';
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { environment } from 'src/environments/environment';
// import { browserSessionPersistence, getAuth, inMemoryPersistence, provideAuth, setPersistence } from '@angular/fire/auth';

interface JwtPayload {
  exp: number; // Expiration time
  // Add other fields as needed based on your JWT payload structure
}


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public platform: Platform,   private storageService: StorageServiceService) { }

  // Method to retrieve the token (replace with your token retrieval logic)
  // private getToken(): Observable<string | null> {
  //   // Example: retrieve token from local storage
  //   const token = localStorage.getItem('token');
  //   return from(Promise.resolve(token));
  // }


  isTokenExpired(token: string): boolean {

    try {
      console.log("isTokenExpired:",token)
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp;
      if(expirationTime){
        console.log("isTokenExpired:",expirationTime)
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("isTokenExpired:",expirationTime <= currentTime)
        return expirationTime <= currentTime;
      }
      else{
        console.log("isTokenExpired:else")
        return true;
      }
  
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Consider returning false or throwing an error here based on your requirement
    }
  }





  async isIdTokenValid(): Promise<boolean> {
    const maxRetries = 5;
    let retryCount = 0;

    const validateTokenWithRetry = () => {
        return new Promise<boolean>((resolve, reject) => {
            const tryValidateToken = () => {
                this.storageService.get("user_token").then((storedToken) => {

                  resolve(true);
                 
                });
            };

            tryValidateToken();
        });
    };

    return new Promise<boolean>((resolve, reject) => {
        validateTokenWithRetry()
            .then(() => resolve(true))
            .catch(() => reject());
    });
}

   async refreshToken(): Promise<boolean> {
    try {
     return true
      // let result = await FirebaseAuthentication.getIdToken({forceRefresh:true});
      // console.log("user result.token"+result.token)
      // if (result) {
      //   // const tokenResult = await firstValueFrom(this.generateFirebaseToken(user));
  
      //   if (result.token) {
    
      //     return true;
      //   } else {
      //     this.logout();
      //     return false;
      //   }
      // } else {
      //   return false;
      // }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  }





  logout():Promise<boolean>{
    return new Promise((resolve,reject)=>{
      FirebaseAuthentication.signOut().then(() => {
        // Sign-out successful.
        console.log("signed out")
        resolve(true);
      }).catch((error) => {
        // An error happened.
        console.log("unable to signed out "+error)
        reject()
      });
    })
  
  }


  async fetchNewTokne(){
  
    FirebaseAuthentication.getCurrentUser()
    return await FirebaseAuthentication.getIdToken({forceRefresh:true}).then(e=>{
      return e;
    }).catch(error=>{
      console.error(error);
      return null
    });
    // return toke;
// return FirebaseAuthentication.reload().then(async e=>{
//  return await FirebaseAuthentication.getIdToken();
// });

  }
  

  // Method to retrieve the token as an Observable
  private getToken(): Observable<string | null> {
    console.log("token getToken:")
    return new Observable((observer) => {
      let authToken = '';
      observer.next("newStoredToken");
      // this.isIdTokenValid().then((isValid) => {
      //   if (isValid) {
      //     this.storageService.get("user_token")?.then((storedToken) => {
      //       console.log("token exists in storageService: " + storedToken)
      //       if (storedToken) {
      //         authToken = storedToken;
      //         observer.next(authToken);
      //         observer.complete();
      //       } else {
        
      //         this.refreshToken().then((refreshSuccess) => {
      //           if (refreshSuccess) {
      //             this.storageService.get("user_token")?.then((newStoredToken) => {
      //               if (newStoredToken) {
      //                 console.log("new token created")
      //                 observer.next(newStoredToken);
      //                 observer.complete();
      //               } else {
      //                 console.log("new token not found")
      //                 observer.error("New token not found");
      //               }
      //             });
      //           } else {
      //             console.log("refresh failure")
      //             observer.error("Refresh failure");
      //           }
      //         });
      //       }
      //     });
      //   } else {
      //     this.refreshToken().then(
      //       r => {
      //         if (r) {
      //           this.storageService.get("user_token")?.then((newStoredToken) => {
      //             if (newStoredToken) {
      //               console.log("token exists")
      //               observer.next(newStoredToken);
      //               observer.complete();
      //             } else {
      //               console.log("token doesn't exist")
      //               observer.error("Token not found");
      //             }
      //           });
      //         } else {
      //           console.log("token refresh didn't happen")
      //           observer.error("Token refresh failed");
      //         }
      //       }
      //     );
      //   }
      // });
    });
  }


  public getWithToken<T>(url: string): Observable<T|any> {
    return this.getToken().pipe(
      mergeMap((token) => {
        if (!token) {
          return throwError('Token not found');
        }

        // Attach token to request header
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        // Make Capacitor HTTP GET request
        return from(CapacitorHttp.get({
          url,
          headers
        })).pipe(
          catchError(error => {
            console.error('Error making HTTP request:', error);
            return throwError('Error making HTTP request');
          }),mergeMap((response) => {
            // Here you parse the response and return it directly
            if (typeof response.data === 'object') {
              // If it's already an object, return it directly
              return of(response.data);
            } else {
              // Otherwise, parse it as JSON
              return of(response.data);
              // return JSON.parse(response.data);
            }
          })
        );
      })
    );
  }
  

  // Method to make authenticated Capacitor HTTP GET requests
  // public getWithToken<T>(url: string): Observable<T> {
  //   console.log("token getWithToken:")
  //   return this.getToken().pipe(
  //     mergeMap((token) => {
  //       if (!token) {
  //         return throwError('Token not found');
  //       }

  //       // Attach token to request header
  //       const headers = {
  //         'Authorization': `Bearer ${token}`
  //       };
  //       console.log("token fetched:"+headers)

  //       // Make Capacitor HTTP GET request
  //       return from(CapacitorHttp.get({
  //         url,
  //         headers
  //       })).pipe(
  //         catchError(error => {
  //           console.error('Error making HTTP request:', error);
  //           return throwError('Error making HTTP request');
  //         }),
  //         // Assuming the response is JSON and you want to map it to the type T
  //         mergeMap((response: HttpResponse) => {
  //           console.log("mergemap response:"+JSON.stringify(response))
  //           // Here you parse the response and return it as an Observable
  //           const responseData: T = JSON.parse(response.data);
  //           return new Observable<T>((observer) => {
  //             observer.next(responseData);
  //             observer.complete();
  //           });
  //         }))
  //     }),
  //     catchError(error => {
  //       console.error('Error making HTTP request:', error);
  //       return throwError('Error making HTTP request');
  //     })
  //   );
  // }

  // Method to make authenticated Capacitor HTTP POST requests
  public postWithToken<T>(url: string, data: any): Observable<T|any> {
    return this.getToken().pipe(
      mergeMap((token) => {
        if (!token) {
          return throwError('Token not found');
        }

        // Attach token to request header
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const options = {
          url: url,
          headers: headers,
          data: data,
        };
        // Make Capacitor HTTP POST request
        return from(CapacitorHttp.post(options));
      }),
      catchError(error => {
        console.error('Error making HTTP request:', error);
        return throwError('Error making HTTP request');
      }),mergeMap((response) => {
        // Here you parse the response and return it directly
        if (typeof response.data === 'object') {
          // If it's already an object, return it directly
          return of(response.data);
        } else {
          // Otherwise, parse it as JSON
          return of(response.data);
        }
      })
    );
  }
}
