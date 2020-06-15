import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service'



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  products:any;
  res:any;

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
