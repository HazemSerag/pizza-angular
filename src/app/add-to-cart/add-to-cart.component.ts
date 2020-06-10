import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, } from '@angular/core';
import { CartService } from '../services/cart.service'

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() pizza:any;

  constructor(private cartService:CartService) {
   }



  ngOnInit() {
  }

  addToCart(pizza){
    this.cartService.addToCart({"productId":`${pizza._id}`,"quantity":1,"title":`${pizza.title}`,"price":pizza.price,"imgUrl":`${pizza.imgUrl}`}).subscribe(res=>{
      
      alert(res)
    });
  }
  

}
