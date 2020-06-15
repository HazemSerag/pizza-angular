import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signUpTab=false;
  signUpForm: FormGroup;
  loginForm: FormGroup;
  loginSubmitted=false;
  registerSubmitted=false;

  constructor(private authService:AuthService,private formBuilder: FormBuilder,private router:Router, private flashService: FlashMessagesService) { }

  ngOnInit() {

          //Sign up Form Validator
      this.signUpForm = this.formBuilder.group(
        {
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        {
          validator: this.MustMatch('password', 'confirmPassword')
        }
      )

      //Login Form Validator
    this.loginForm = this.formBuilder.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required, Validators.minLength(6)]]
      })

  }

  get signInForm() { return this.loginForm.controls; }

  get registerForm() { return this.signUpForm.controls; }


   MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}


onLoginSubmit() {
  this.loginSubmitted = true;
  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }
  
  //login function
  const user= {
    email:this.loginForm.value.loginEmail,
    password:this.loginForm.value.loginPassword
  }
  this.authService.login(user).subscribe(res=>{
    const response:any=res;
    if(!response.success){
      return  this.flashService.show(response.msg,{ cssClass: 'alert-danger', timeout: 2500 })
    }

    this.authService.storeUserData(response.accessToken,response.userInfo)
    this.router.navigate(['orders']);
  })

}


onRegisterSubmit() {
  this.registerSubmitted = true;
  // stop here if form is invalid
  if (this.signUpForm.invalid) {
      return;
  }
  //sifn up function
      const user={
      email:this.signUpForm.value.email,
      username:this.signUpForm.value.username,
      password:this.signUpForm.value.password,
      confirmPassword:this.signUpForm.value.confirmPassword
    }
    this.authService.register(user).subscribe(res=>{
      const response:any=res;
      if(response.success){
        return this.flashService.show(response.msg,{ cssClass: 'alert-success', timeout: 2500 })
      }
       this.flashService.show(response.msg,{ cssClass: 'alert-danger', timeout: 2500 })


    })
}


  showLogin(){
    this.signUpTab = false;

  }

  showSignUp(){
    this.signUpTab = true;
  }

}
