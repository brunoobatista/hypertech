import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Cliente } from '../model/Cliente';
import * as corePag from '../core/core-pagination';

export class ClienteFilter {
  nome: string;
  tipoPessoa: string;
  pagina = 0;
  itensPorPagina = corePag.itensPorPagina;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteUrl: string;

  constructor(private http: MasterHttp) {
    this.clienteUrl = `${environment.apiUrl}/clientes`;
  }

  adicionar(cliente: Cliente): Promise<any> {
    return this.http.post<Cliente>(this.clienteUrl, cliente)
      .toPromise();
  }

  pesquisarTodos(valor: any): Promise<any> {
    return this.http.get<Cliente>(`${this.clienteUrl}/search/${valor}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }
/*
  pesquisarTodos(valor: any): Observable<Cliente[]> {
    console.log('teste', this.http.get<Cliente[]>(`${this.clienteUrl}/search/${valor}`))
    return this.http.get<Cliente[]>(`${this.clienteUrl}/search/${valor}`);

  }
*/
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
    if (filtro.tipoPessoa) {
      params = params.append('tipoPessoa', filtro.tipoPessoa);
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

  buscarPorCodigo(id: number): Promise<Cliente> {
    return this.http.get<Cliente>(`${this.clienteUrl}/${id}`)
        .toPromise();
  }

  excluirCliente(id: number, posicaoPagina: number, itensPorPagina: number): Promise<any> {
    const dados = (posicaoPagina + 1) * itensPorPagina;

    const params = new HttpParams({
      fromObject: {
        page: `${dados}`,
        size: '1',
      }
    });

    //const cliente = this.buscarProximo(params);
    return this.http.delete<any>(`${this.clienteUrl}/${id}`, { params })
        .toPromise()
        .then(response => {
          return response;
        });

  }

  buscarProximo(params): Promise<any> {
    return this.http.get<any>(`${this.clienteUrl}`, { params })
        .toPromise()
        .then(response => {
          if (response.content.length > 0) {
            return response.content[0];
          } else {
            return;
          }
        });
  }

}
