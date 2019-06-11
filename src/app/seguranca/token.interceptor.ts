import {Injectable} from '@angular/core';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { AuthService } from './auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authHeader = this.auth.getAuthorizationHeader();
        if (!this.auth.isAccessTokenInvalido() && (request.url !== this.auth.oauthTokenUrl)) {
          const authReq = request.clone({headers: request.headers.set('Authorization', authHeader)});
          return next.handle(authReq);
        } else {
          return next.handle(request);
        }
    }
}
