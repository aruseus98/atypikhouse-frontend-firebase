import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  constructor(private token: TokenStorageService, private router: Router){}

  canActivate(): boolean {
    if(!this.token.isFullyAuthenticated()){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
}
