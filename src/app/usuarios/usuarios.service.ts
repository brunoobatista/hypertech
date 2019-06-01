import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';

import { environment } from './../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarioUrl: string;

  constructor(private http: MasterHttp) {
    this.usuarioUrl = `${environment.apiUrl}/usuarios`;
  }

  listarPermissoes(): Promise<any> {
    return this.http.get<any>(`${this.usuarioUrl}/permissoes`)
      .toPromise()
      .then(response => {
        return response;
      });
  }
}
