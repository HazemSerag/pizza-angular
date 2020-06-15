import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service'


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders:any;
  orderItems:any;
  noOrders=true;
  constructor(private ordersService:OrdersService) { }

  ngOnInit() {
    this.getOrders()
  }

  getOrders(){
    // const userId=JSON.parse(localStorage.getItem('user')).id
    this.ordersService.getOrders().subscribe(fetchedOrders=>{
      this.orders=fetchedOrders;
      if(this.orders.length==0){
        this.noOrders=true;
      }else{
        this.noOrders=false;
      }
    })
  }

}
