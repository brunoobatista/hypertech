import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';
import { Fornecedor } from './../model/Fornecedor';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Produto } from '../model/Produto';

export class ProdutoFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = 10;
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
    const dadosPagina = posicaoPagina + itensPorPagina - 1;
    const params = new HttpParams({
      fromObject: {
        page: `${posicaoPagina}`,
        size: `${itensPorPagina}`
      }
    });

    return this.http.delete<any>(`${this.produtopUrl}/${id}`)
      .toPromise()
      .then(response => {
        return response;
        //return this.buscarProximo(params, dadosPagina);
      });
  }

  buscarProximo(params, dadosPagina): Promise<any> {
    return this.http.get<any>(`${this.produtopUrl}`, { params })
      .toPromise()
      .then(resp => {
        const resultado = {
          produtos: resp.content,
          total: resp.totalElements
        };
        console.log('teste2 2 2 2 2', resp, resultado, dadosPagina)
        return (resultado.total + 1) < dadosPagina ? null : resultado.produtos;
      });
  }

}
