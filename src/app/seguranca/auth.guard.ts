import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
 ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
       if (this.auth.isAccessTokenInvalido()) {
          return this.auth.obterNovoAccessToken()
             .then(() => {
                if (this.auth.isAccessTokenInvalido()) {
                   this.router.navigate(['/login']);
                   return false;
                }
                return true;
             });
       } else
       if (next.data && next.data.permissaos && !this.auth.temQualquerPermissao(next.data.permissaos)) {
          this.router.navigate(['/nao-autorizado']);
          return false;
       }
       return true;
    }

}
