import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service'




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products:any;

  constructor(private productsService:ProductsService) {
    
  }


  ngOnInit() {
    this.getProducts()
  }

  getProducts(){
    this.productsService.getProducts().subscribe(fetchedProducts=>{
      this.products=fetchedProducts;
    })
  }

}
