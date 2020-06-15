import { Component, OnInit } from '@angular/core';
import { CartService} from '../services/cart.service'
import { Router, ActivatedRoute } from '@angular/router';
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
  currency:string;
  delivery=12;
  cartIsEmpty=true;
  constructor(private cartService:CartService, public route: ActivatedRoute, private router:Router ,private flashService: FlashMessagesService) { 
    
  }
 
  ngOnInit() {
    this.currency="$";
   this.getCart() 
  }


  getCart(){
    this.cartService.getCart().subscribe(fetchedCart=>{
      this.cartItems=fetchedCart
      if(this.cartItems.length==0){
        this.cartIsEmpty=true;
      }else{
        this.cartIsEmpty=false;
      }
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
    this.totalPrice+=this.delivery;
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
      this.router.navigate(['order-form'], { queryParams: { currency: this.currency } })

    })

  }

  deleteFromCart(productId){
    this.cartService.deleteCartItem(productId).subscribe(res=>{
      let response:any = res;
      this.getCart()
      this.flashService.show(response.msg,{ cssClass: 'alert-success', timeout: 1500 })   
    })
  }



}
