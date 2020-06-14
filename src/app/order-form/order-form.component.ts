import { Component, OnInit } from '@angular/core';
import { CartService} from '../services/cart.service'
import { OrdersService} from '../services/orders.service'
import { AuthService } from '../services/auth.service' 
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  cart:any;
  cartItems:any;
  changed:boolean;
  totalPrice;
  name;surname;email;number;adress;notes;isLogged;
  constructor(private cartService:CartService, private ordersService:OrdersService,private authService:AuthService, private flashService: FlashMessagesService) { }


  ngOnInit() {
    this.getCart() 
  }

  orderNow(){
    const order = {
      items:this.cartItems,
      details:{
        name:this.name,
        surname:this.surname,
        email:this.email,
        number:this.number,
        address:this.adress,
        notes:this.notes,
        userId : this.authService.isLoggedIn() ? JSON.parse(localStorage.getItem('user')).id:undefined,
      }
    }

    this.ordersService.addOrder(order).subscribe(res=>{
      let response:any=res;
      this.flashService.show(response.msg,{ cssClass: 'alert-success', timeout: 1500 })      
    })

  }


  getCart(){
    this.cartService.getCart().subscribe(fetchedCart=>{
      console.log(fetchedCart)
      this.cartItems=fetchedCart
      this.changed=false;
    this.getTotalPrice(this.cartItems)
    });
  }

  getTotalPrice(cartItems){
    this.totalPrice=0;
    cartItems.map(p=>{
      this.totalPrice+=(p.product.price*p.quantity);
    })
    return this.totalPrice;
  }

}
