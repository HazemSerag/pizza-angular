import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public getCartUrl = '/restaurant/cart'

  private addToCartUrl = '/api/add-to-cart' 

  private updateCartUrl = '/api/update-cart' 


  private deleteFromCartUrl = '/api/delete-from-cart' 

  constructor( private http:HttpClient) { }

  getCart(){
    return this.http.get(this.getCartUrl);
  }

  addToCart(product){
    return this.http.post(this.addToCartUrl, product)
  }

  updateCartItems(cartItems){
    return this.http.post(this.updateCartUrl, cartItems)
  }

  deleteCartItem(productId){
    return this.http.post(this.deleteFromCartUrl, {productId:productId});
  }
}
