import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

public ordersUrl = 'restaurant/orders';
private addOrderUrl = '/api/add-order'

  constructor(private http:HttpClient) { }

  getOrders(){
    // const token = localStorage.getItem('id_token');
    // const header = new HttpHeaders({'Content-Type':'application/json','Authorization':`jwt ${token}`});
    return this.http.get(this.ordersUrl);
  }

  getOrder(orderId){
    // const token = localStorage.getItem('id_token');
    // const header = new HttpHeaders({'Content-Type':'application/json','Authorization':`jwt ${token}`});
    return this.http.get(this.ordersUrl+'/'+orderId);
  }

  addOrder(order){
    return this.http.post(this.addOrderUrl, order)
  }

}
