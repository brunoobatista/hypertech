import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    ) {
      this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
      this.carregarToken();
    }

  login(username: string, password: string): Promise<void> {
    const headers = new HttpHeaders()
            .append('Content-Type', 'application/x-www-form-urlencoded')
            .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');
    const body = `username=${username}&password=${password}&grant_type=password&client=angular`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token);
      })
      .catch(error => {
        if (error.status === 400) {
          if (error.error === 'invalid_grant') {
             return Promise.reject('Usuário ou senha inválida!');
          }
        }
        return Promise.reject(error);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
          .append('Content-Type', 'application/x-www-form-urlencoded')
          .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');

    const body = 'grant_type=refresh_token';

    return this.http.post<any>(this.oauthTokenUrl, body,
             { headers, withCredentials: true })
       .toPromise()
       .then(response => {
          this.armazenarToken(response.access_token);
          return Promise.resolve(null);
       })
       .catch(error => {
          return Promise.resolve(null);
       });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
          return true;
       }
    }
    return false;
  }

  getAuthorizationHeader() {
    return `Bearer ${localStorage.getItem('token')}`;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
       this.armazenarToken(token);
    }
  }

}
