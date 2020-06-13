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
      console.log(fetchedCart)
      this.cartItems=fetchedCart
    });
  }

  orderNow(cart){
    console.log(cart)
    this.ordersService.addOrder(cart).subscribe(res=>{
      let response:any = res;
      this.getCart()
      alert(response.msg)
    })
  }

  deleteFromCart(productId){
    console.log("angular" +  productId)
    this.cartService.deleteCartItem(productId).subscribe(res=>{
      let response:any = res;
      this.getCart()
      alert(response.msg)
    })
  }



}
