import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsURL = "http://localhost:8080/"

  constructor(private http:HttpClient ) { }

  getProducts(){
    return this.http.get(this.productsURL)
  }

  getProduct(prodId){
    return this.http.get(this.productsURL+"menu/"+prodId);
  }

}
