import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Cliente } from '../model/Cliente';

export class ClienteFilter {
  nome: string;
  email: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteUrl: string;

  constructor(private http: MasterHttp) {
    this.clienteUrl = `${environment.apiUrl}/clientes`;
  }

  pesquisarTodos(valor: any): Promise<any> {
    return this.http.get<Cliente>(`${this.clienteUrl}/search/${valor}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  pesquisar(filtro: ClienteFilter): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString(),
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.clienteUrl}`, { params })
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

}
