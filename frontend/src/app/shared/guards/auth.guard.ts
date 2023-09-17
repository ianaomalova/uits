import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {catchError, Observable, of} from 'rxjs';
import {AuthService} from '@app/shared/services/auth.service';
import {map} from 'rxjs/operators';
import {PagesConfig} from '@app/configs/pages.config';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Auth guard works');
    return this.authService.retrieveProfile().pipe(
      map(user => 'username' in user),
      catchError(() => {
        this.router.navigateByUrl(PagesConfig.auth.login);
        return of(false);
      })
    );
  }

}
