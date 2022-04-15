import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class AclGuard implements CanActivate {
  
    constructor(
      private authService: AuthService,
      private router: Router
    ) {
    }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const loggedUser = this.authService.getUserFromStorage();
  
      if (loggedUser.role !== 'admin') {
        this.router.navigate(['/']);
  
        return false;
      }
  
      return true;
    }
  }