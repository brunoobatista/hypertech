import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Produto } from '../model/Produto';

export class ProdutoFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 15;
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
    const dadosPagina = (posicaoPagina + 1) * itensPorPagina;
    const params = new HttpParams({
      fromObject: {
        page: `${dadosPagina}`,
        size: `1`
      }
    });
    const produto = this.buscarProximo(params);
    return this.http.delete<any>(`${this.produtopUrl}/${id}`)
      .toPromise()
      .then(response => {
        return produto;
      });
  }

  buscarProximo(params): Promise<any> {
    return this.http.get<any>(`${this.produtopUrl}`, { params })
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
