import { Component, OnInit } from '@angular/core';
import { CartService} from '../services/cart.service'
import { OrdersService} from '../services/orders.service'
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart:any;
  cartItems:any;
  changed:boolean;
  totalPrice;
  constructor(private cartService:CartService, private ordersService:OrdersService, private router:Router ,private flashService: FlashMessagesService) { 
    
  }
 
  ngOnInit() {
   this.getCart() 
  }

  getCart(){
    this.cartService.getCart().subscribe(fetchedCart=>{
      console.log(fetchedCart)
      this.cartItems=fetchedCart
      this.changed=false;
    this.getTotalPrice(this.cartItems)
    });
  }


  updateCart(cartItems){
    this.cartService.updateCartItems(cartItems).subscribe(res=>{
      let response:any=res;
      this.flashService.show(response.msg,{ cssClass: 'alert-success', timeout: 1500 })   
    })
  }

  getTotalPrice(cartItems){
    this.totalPrice=0;
    cartItems.map(p=>{
      this.totalPrice+=(p.product.price*p.quantity);
    })
    return this.totalPrice;
  }

  increase(item,productId){
    this.changed=true;
    let itemIndex = this.cartItems.findIndex(x=>x.product._id.toString()===productId.toString());
    item.quantity++;
    this.cartItems[itemIndex]=item;
    this.getTotalPrice(this.cartItems)
  }

  decrease(item,productId){
    if(item.quantity>1){
      this.changed=true;
      let itemIndex = this.cartItems.findIndex(x=>x.product._id.toString()===productId.toString());
      item.quantity--;
      this.cartItems[itemIndex]=item;
      this.getTotalPrice(this.cartItems)
    }
  }

  orderNow(cartItems){
    this.cartService.updateCartItems(cartItems).subscribe(res=>{
      this.router.navigate(['order-form'])

    })

  }

  deleteFromCart(productId){
    console.log("angular" +  productId)
    this.cartService.deleteCartItem(productId).subscribe(res=>{
      let response:any = res;
      this.getCart()
      this.flashService.show(response.msg,{ cssClass: 'alert-success', timeout: 1500 })   
    })
  }



}
