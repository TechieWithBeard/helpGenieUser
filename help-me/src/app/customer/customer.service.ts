import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../data-model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(public httpService:HttpService) { }



  getAllCategories():Observable<Category[]>{
    return this.httpService.getWithToken(environment.Server_URL+"category/getServiceCategory");
  }
}
