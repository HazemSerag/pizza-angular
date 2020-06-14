import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //Sign Up Vars
  signUpUsername;signUpEmail;signUpPassword;signUpConfirmPassword;
  //Sign Up Vars

  //Login Vars
  loginEmail;loginPassword;
  //Login Vars

  constructor(private authService:AuthService,private router:Router, private flashService: FlashMessagesService) { }

  ngOnInit() {
  }

  signUp(){
    const user={
      email:this.signUpEmail,
      username:this.signUpUsername,
      password:this.signUpPassword,
      confirmPassword:this.signUpConfirmPassword
    }
    this.authService.register(user).subscribe(res=>{
      const response:any=res;
      if(response.success){
        return this.flashService.show(response.msg,{ cssClass: 'alert-success', timeout: 2500 })
      }
       this.flashService.show(response.msg,{ cssClass: 'alert-danger', timeout: 2500 })


    })

  }

  login(){
    const user= {
      email:this.loginEmail,
      password:this.loginPassword
    }
    this.authService.login(user).subscribe(res=>{
      const response:any=res;
      console.log(response.success)
      if(!response.success){
        return  this.flashService.show(response.msg,{ cssClass: 'alert-danger', timeout: 2500 })
      }

      this.authService.storeUserData(response.accessToken,response.userInfo)
      this.router.navigate(['orders']);
    })
  }

}
