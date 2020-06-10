import { Component, OnInit } from '@angular/core';
import { CartService} from '../services/cart.service'
import { OrdersService} from '../services/orders.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart:any;
  cartItems:any;
  constructor(private cartService:CartService, private ordersService:OrdersService ) { }
 
  ngOnInit() {
   this.getCart() 
  }

  getCart(){
    this.cartService.getCart().subscribe(fetchedCart=>{
      this.cart=fetchedCart;
      this.cartItems=this.cart.items
    });
  }

  orderNow(cart){
    this.ordersService.addOrder(cart).subscribe(res=>{
      alert(res)
    })
  }

}
