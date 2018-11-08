import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';
import { Fornecedor } from './../model/Fornecedor';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  fornecedorUrl: string;
  cidadeUrl: string;

  constructor(private http: MasterHttp) {
    this.fornecedorUrl = `${environment.apiUrl}/fornecedores`;
    this.cidadeUrl = `${environment.apiUrl}/cidades`;
  }

  adicionar(fornecedor: Fornecedor): Promise<any> {
    return this.http.post<Fornecedor>(this.fornecedorUrl, fornecedor)
      .toPromise();
  }


}
