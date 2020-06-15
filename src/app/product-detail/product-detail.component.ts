import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../services/products.service'
import { ActivatedRoute} from '@angular/router';
import { CartService } from '../services/cart.service';
import { FlashMessagesService } from 'angular2-flash-messages';




@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  prodId;
  product;
  constructor(public productService:ProductsService, private route:ActivatedRoute,private cartService:CartService,private flashService: FlashMessagesService) { }

  ngOnInit() {
    window.scrollTo(0,0)
    this.getProduct(this.route.snapshot.paramMap.get('prodId'));
  }



  increase(){
    this.product.quantity++;
  }

  decrease(){
    if(this.product.quantity>1){
      this.product.quantity--;
    }
  }

  getProduct(id){
    this.productService.getProduct(id).subscribe(product=>{
      this.product=product
      this.product.quantity=1;
    })
    }
    
    addToCart(addedProduct){
      
      const product = {
        "productId":addedProduct._id,
        "quantity":addedProduct.quantity
      }
      
      this.cartService.addMultipleToCart(product).subscribe((res)=>{
        const response:any=res;
        this.flashService.show(response.msg,{ cssClass: 'alert-success', timeout: 1500 })      
      })

      
    }
}
