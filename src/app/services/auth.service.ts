import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService  } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signUpUrl= '/auth/sign-up';
  loginUrl= '/auth/login';
  logoutUrl= '/auth/logout';
  authToken;
  user:any;

  constructor(private http:HttpClient,private jwtHelper: JwtHelperService) { }

  register(user){
    return this.http.post(this.signUpUrl,user);
  }

  login(user){
    return this.http.post(this.loginUrl,user);
  }

  logout(){
    const userId = JSON.parse(localStorage.getItem('user')).id
    localStorage.clear();
    return this.http.post(this.logoutUrl, {userId:userId})
  }

  storeUserData(token,user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken=token
    this.user=user
  }

  isLoggedIn(){
    return !this.jwtHelper.isTokenExpired()
  }

}
