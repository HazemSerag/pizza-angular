import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsURL = "/restaurant"

  constructor(private http:HttpClient ) { }

  getProducts(){
    return this.http.get(this.productsURL)
  }

  getProduct(prodId){
    return this.http.get(this.productsURL+"/menu/"+prodId);
  }

}
