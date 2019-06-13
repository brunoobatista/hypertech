import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';

import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments/environment';
import { Venda } from '../model/Venda';
import { formatDate } from '@angular/common';

import * as corePag from '../core/core-pagination';

export class VendaFilter {
  vendaDe: Date;
  vendaAte: Date;
  clienteId: string;
  pagina = 0;
  itensPorPagina = corePag.itensPorPagina;
}

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  vendaUrl: string;

  constructor(private http: MasterHttp) {
    this.vendaUrl = `${environment.apiUrl}/vendas`;
  }

  salvar(venda: Venda): Promise<any> {
    return this.http.post<Venda>(`${this.vendaUrl}/salvar`, venda)
      .toPromise();
  }

  salvarFinalizar(venda: Venda): Promise<any> {
    return this.http.post<Venda>(`${this.vendaUrl}/finalizar`, venda)
      .toPromise();
  }

  cancelar(venda: Venda): Promise<any> {
    return this.http.post<Venda>(`${this.vendaUrl}/cancelar`, venda)
      .toPromise();
  }

  estornar(venda: Venda): Promise<any> {
    return this.http.put<Venda>(`${this.vendaUrl}/estornar`, venda)
      .toPromise();
  }

  remover(id: number, posicaoPagina: number, itensPorPagina: number): Promise<any> {
    const dados = (posicaoPagina + 1) * itensPorPagina;

    const params = new HttpParams({
      fromObject: {
        page: `${dados}`,
        size: '1',
      }
    });

    return this.http.delete<any>(`${this.vendaUrl}/${id}`, { params })
        .toPromise()
        .then(response => {
          return response;
        });

  }

  pesquisar(filtro: VendaFilter): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.vendaDe) {
      params = params.append('vendaDe', formatDate(filtro.vendaDe.toString(), 'yyyy-MM-dd HH:mm:ss', 'pt'));
    }

    if (filtro.vendaAte) {
      params = params.append('vendaAte', formatDate(filtro.vendaAte.toString(), 'yyyy-MM-dd HH:mm:ss', 'pt'));
    }

    if (filtro.clienteId) {
      params = params.append('clienteId', filtro.clienteId);
    }

    return this.http.get<any>(`${this.vendaUrl}`, { params })
        .toPromise()
        .then(response => {
          return response;
        });
  }

  buscarPorCodigo(id: number): Promise<any> {
    return this.http.get<Venda>(`${this.vendaUrl}/${id}`)
      .toPromise();
  }

  removerProduto(vendaId: number, produtoId: number): Promise<any> {
    return this.http.delete<any>(`${this.vendaUrl}/${vendaId}/${produtoId}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

}
