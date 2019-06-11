import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';
import { Fornecedor } from './../model/Fornecedor';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';

import * as corePag from '../core/core-pagination';

export class FornecedorFilter {
  cpfCnpj: string;
  nome: string;
  nomeFantasia: string;
  valorDeBusca: string;
  pagina = 0;
  itensPorPagina = corePag.itensPorPagina;
}

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

  pesquisar(filtro: FornecedorFilter): Promise<any> {
    let params = new HttpParams({
      fromObject: {
         page: filtro.pagina.toString(),
         size: filtro.itensPorPagina.toString()
      }
   });

   if (filtro.valorDeBusca) {
     params = params.append('valorDeBusca', filtro.valorDeBusca);
   }

    return this.http.get<any>(`${this.fornecedorUrl}`, { params })
      .toPromise()
      .then(response => {
        const result = {
          content: response.content,
          totalElements: response.totalElements,
          totalPages: response.totalPages,
          first: response.first,
          last: response.last,
          number: response.number,
          size: response.size
        };
        return result;
      });
  }

  buscarPorCodigo(id: number): Promise<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.fornecedorUrl}/${id}`)
      .toPromise();
  }

  excluir(id: number, posicaoPagina: number, itensPorPagina: number): Promise<any> {
    const dados = (posicaoPagina + 1) * itensPorPagina;

    const params = new HttpParams({
      fromObject: {
        page: `${dados}`,
        size: '1',
      }
    });

    return this.http.delete<any>(`${this.fornecedorUrl}/${id}`, { params })
      .toPromise()
      .then(response => {
          return response;
      });
  }

}
