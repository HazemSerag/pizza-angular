import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, } from '@angular/core';
import { CartService } from '../services/cart.service'
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() pizza:any;

  constructor(private cartService:CartService, private flashService: FlashMessagesService) {
   }



  ngOnInit() {
  }

  addToCart(pizza){
    //dummy controller for quantity
    pizza.quantity=1;
    this.cartService.addToCart({"productId":`${pizza._id}`, "quantity":pizza.quantity}).subscribe(res=>{
      let response:any = res;
       this.flashService.show(response.msg,{ cssClass: 'alert-success', timeout: 1500 })      
    });
  }
  

}
