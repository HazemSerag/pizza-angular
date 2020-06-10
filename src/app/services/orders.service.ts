import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

public ordersUrl = 'http://localhost:8080/orders';
private addOrderUrl = 'http://localhost:8080/api/add-order'

  constructor(private http:HttpClient) { }

  getOrders(){
    return this.http.get(this.ordersUrl);
  }

  addOrder(order){
    return this.http.post(this.addOrderUrl, order,{responseType: 'text'})
  }
}
