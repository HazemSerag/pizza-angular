import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service'
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order:any;

  constructor(private ordersService:OrdersService,  private route:ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0,0);

    this.getOrder(this.route.snapshot.paramMap.get('orderId'))
  }

  getOrder(orderId){
    this.ordersService.getOrder(orderId).subscribe(order=>{
      this.order=order;
    })
  }


}
