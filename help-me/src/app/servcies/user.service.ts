import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { UserAddress } from 'helpGenieServer/mmodel-data/server-user-address.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Place, UserAddress } from '../data-model/category.model';
import { AddressData } from '../data-model/user-address-data.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public _http:HttpService) { }


  public getUserAddress(userID:string):Observable< UserAddress[]>{
   return this._http.getWithToken< UserAddress[]>(environment.Server_URL+"user/getUserAddress/"+userID)
  }

  public updateUserAddres(addressData:UserAddress,userID:string):Observable<any>{
    return this._http.postWithToken(environment.Server_URL+"user/updateUserAddress/"+userID,addressData);
  }


  public EditDefaultUserAddress(addressData:UserAddress[],userID:string):Observable<any>{
    return this._http.postWithToken(environment.Server_URL+"user/editDefaultUserAddress/"+userID,addressData);
  }

  public addNewUserAddres(addressData:UserAddress,userID:string):Observable<any>{
    return this._http.postWithToken(environment.Server_URL+"user/addUserAddress/"+userID,addressData);
  }



  public getPlaceName(latitude: number, longitude: number):Observable<Place> {
    const apiKey = environment.GMAP_API_KEY;
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

   return this._http.getWithToken(url)
  }

}
