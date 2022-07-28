import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isloggedin:boolean = false;
  constructor(private router: Router) {
    if (localStorage.getItem('Loginuser')) {
      this.isloggedin = true;
    }
  }
  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  ngOnInit(): void {
  }
  onLogout() {
    localStorage.removeItem('Loginuser');
    this.isloggedin = false;  
    this.router.navigate(['/']);
  }
}
