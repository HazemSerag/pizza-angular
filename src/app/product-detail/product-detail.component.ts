import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../services/products.service'
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  prodId;
  product;
  constructor(public productService:ProductsService, private route:ActivatedRoute) { }

  ngOnInit() {
    // this.prodId = this.route.snapshot.paramMap.get('prodId');
    // this.getProduct(this.prodId);
    this.getProduct(this.route.snapshot.paramMap.get('prodId'));

  }

  

  getProduct(id){
    this.productService.getProduct(id).subscribe(product=>{
      // console.log(product)
      this.product=product
    })

  }

}
