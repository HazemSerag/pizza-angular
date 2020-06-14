import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";

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
import { AuthService } from './services/auth.service';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guard/auth-guard.service';
import { ServerErrorComponent } from './server-error/server-error.component'
import { FlashMessagesModule } from 'angular2-flash-messages';


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
    ProductDetailComponent,
    OrderDetailsComponent,
    OrderFormComponent,
    LoginComponent,
    ServerErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    JwtModule.forRoot({
      config:{ 
        tokenGetter: () => {
        return localStorage.getItem("id_token");
      },}
    }),
    FlashMessagesModule.forRoot()
  ],
  providers: [ProductsService,CartService,OrdersService,AuthService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
