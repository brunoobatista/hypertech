import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';
import { Fornecedor } from './../model/Fornecedor';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  cidadeUrl: string;

  constructor(private http: MasterHttp) {
    this.cidadeUrl = `${environment.apiUrl}/cidades`;
  }

  listarCidades(): Promise<any> {
    return this.http.get<any>(`${this.cidadeUrl}`)
      .toPromise();
  }
}
