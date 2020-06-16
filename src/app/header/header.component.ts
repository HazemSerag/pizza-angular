import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navOpen=false;
  constructor(public route: ActivatedRoute,private router: Router, public authService:AuthService) {
    
   }

  ngOnInit() {

  }

  logout(){
    this.authService.logout().subscribe(res=>{
      this.router.navigate(['menu'])
    })
  }

  toggleNav(){
    this.navOpen=!this.navOpen
  }

  resetMenu(){
    this.navOpen=false;
    window.scrollTo(0,0)
  }

}
