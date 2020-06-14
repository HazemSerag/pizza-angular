import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public route: ActivatedRoute,private router: Router, private authService:AuthService) {
    
   }

  ngOnInit() {
  }

  logout(){
    this.authService.logout().subscribe(res=>{
      this.router.navigate(['menu'])
    })
  }

}
