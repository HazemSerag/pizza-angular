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
  constructor(private ordersService:OrdersService) { }

  ngOnInit() {
    this.getOrders()
  }

  getOrders(){
    this.ordersService.getOrders().subscribe(fetchedOrders=>{
      this.orders=fetchedOrders;
    })
  }

}
