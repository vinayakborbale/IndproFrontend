import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit,AfterViewInit {
  userData:any;
  constructor(private authService:AuthService,private router: Router) { }
  ngAfterViewInit(): void {
    this.userData= this.authService.getUserData();
    console.warn(this.userData)
  }
  

  ngOnInit(): void {
    
  }
  logOut(){
    console.warn("logOut")
    this.authService.logout();
    this.router.navigate(['/', 'login']);
    
  }
}
