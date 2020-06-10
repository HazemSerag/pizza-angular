import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { OrdersService } from './services/orders.service';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    CartComponent,
    OrdersComponent,
    NotFoundComponent,
    AddToCartComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductsService,CartService,OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
