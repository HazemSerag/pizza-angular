import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public getCartUrl = 'http://localhost:8080/cart'

  private addToCartUrl = 'http://localhost:8080/api/add-to-cart' 

  constructor( private http:HttpClient) { }

  getCart(){
    return this.http.get(this.getCartUrl);
  }

  addToCart(product){
    return this.http.post(this.addToCartUrl, product,{responseType: 'text'})
  }
}
