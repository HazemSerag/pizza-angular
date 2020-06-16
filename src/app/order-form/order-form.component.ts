import { Component, OnInit } from '@angular/core';
import { CartService} from '../services/cart.service'
import { OrdersService} from '../services/orders.service'
import { AuthService } from '../services/auth.service' 
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  cart:any;
  cartItems:any;
  changed:boolean;
  totalPrice;
  delivery=12;
  currency;
  userInfo:any;
  orderForm: FormGroup;
  submitted = false;
  constructor(private cartService:CartService,private router:Router, private ordersService:OrdersService,private route:ActivatedRoute,public authService:AuthService,private formBuilder: FormBuilder, private flashService: FlashMessagesService) { }


  ngOnInit() {

    window.scrollTo(0,0);

    if(this.authService.isLoggedIn()){
        this.userInfo={
          name:JSON.parse(localStorage.getItem('user')).username,
          email:JSON.parse(localStorage.getItem('user')).email,

        }
    }

    this.orderForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.minLength(7)]],
      address: ['', Validators.required],
      notes:['']
      })


    this.getCart() 
  }

  get form() { return this.orderForm.controls; }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.orderForm.invalid) {
        return;
    }
    this.orderNow(this.orderForm.value)
  }

  onReset() {
    this.submitted = false;
    this.orderForm.reset();
  }

  orderNow(formDetails){
    const details:any={...formDetails};
    details.userId=this.authService.isLoggedIn() ? JSON.parse(localStorage.getItem('user')).id:undefined;
    
    const order = {
      items:this.cartItems,
      details:details,
      currency:this.currency,
      totalPrice:this.totalPrice
    }

    this.ordersService.addOrder(order).subscribe(res=>{
      let response:any=res;
      this.flashService.show(response.msg,{ cssClass: 'alert-success', timeout: 5000 })   
      if(details.userId){
        this.router.navigate(['orders']);

      }else{
        this.router.navigate(['menu']);
      } 
    })

  }


  getCart(){
    this.cartService.getCart().subscribe(fetchedCart=>{
      this.cartItems=fetchedCart
      this.changed=false;

      this.route.queryParams
      .subscribe(params => {
        this.currency = params.currency;
        this.getTotalPrice(this.cartItems)

      });

    });
  }

  getTotalPrice(cartItems){
    this.totalPrice=0;
    cartItems.map(p=>{
      this.totalPrice+=(p.product.price*p.quantity);
    })
    this.totalPrice+=this.delivery;
    if(this.currency.toString()==='€'){
      this.totalPrice*=.89;
      return this.totalPrice;
    }
    return this.totalPrice;
  }
}
