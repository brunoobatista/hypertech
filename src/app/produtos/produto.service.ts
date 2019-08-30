import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Produto } from '../model/Produto';

import * as corePag from '../core/core-pagination';

export class ProdutoFilter {
  nome: string;
  tipoId: number;
  pagina = 0;
  itensPorPagina = corePag.itensPorPagina;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  produtopUrl: string;

  constructor(private http: MasterHttp) {
    this.produtopUrl = `${environment.apiUrl}/produtos`;
  }

  adicionar(produto: Produto): Promise<any> {
    return this.http.post<Produto>(this.produtopUrl, produto)
      .toPromise();
  }

  pesquisarTodos(valor: any): Promise<any> {
    return this.http.get<Produto>(`${this.produtopUrl}/search/${valor}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  pesquisar(filtro: ProdutoFilter): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString(),
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }
    if (filtro.tipoId) {
      params = params.append('tipoId', filtro.tipoId.toString());
    }

    return this.http.get<any>(`${this.produtopUrl}`, { params })
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

  buscarPorCodigo(id: number): Promise<Produto> {
    return this.http.get<Produto>(`${this.produtopUrl}/${id}`)
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

    return this.http.delete<any>(`${this.produtopUrl}/${id}`, { params })
      .toPromise()
      .then(response => {
        return response;
      });
  }

  adicionarUnidadesProduto(produtoId, quantidade): Promise<any> {
    return this.http.put<any>(`${this.produtopUrl}/${produtoId}/adicionar`, quantidade)
      .toPromise()
      .then(response => {
        return response;
      });
  }

}
