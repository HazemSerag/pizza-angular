import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guard/auth-guard.service'
import { ServerErrorComponent } from './server-error/server-error.component';





const routes: Routes = [
  { path : '',redirectTo:'',pathMatch: 'full'},
  { path : '',redirectTo:'menu',pathMatch: 'full'},
  { path : '',redirectTo:'cart',pathMatch: 'full'},
  { path : '',redirectTo:'menu/:prodId',pathMatch: 'full'},
  { path : '',redirectTo:'orders',pathMatch: 'full'},
  { path : '',redirectTo:'500',pathMatch: 'full'},
  { path : '',redirectTo:'orders/:orderId',pathMatch: 'full'},
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu/:prodId', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrdersComponent, canActivate:[AuthGuardService] },
  { path: 'orders/:orderId', component: OrderDetailsComponent ,canActivate:[AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: 'order-form', component: OrderFormComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
