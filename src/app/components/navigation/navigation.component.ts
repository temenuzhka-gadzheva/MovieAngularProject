import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../auth/models/user.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  isLoggedIn = localStorage.getItem("loggedUser");
  user!: User;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
   
  }
  onLogout():void{
    this.authService.logout();
    location.reload();
    this.router.navigate(['/dashboard']);
 
  }
}
