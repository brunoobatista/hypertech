import { Injectable } from '@angular/core';
import { MasterHttp } from './../seguranca/master-http';
import { HttpParams } from '@angular/common/http';
import { Tipo } from './../model/Tipo';

import * as corePag from '../core/core-pagination';

import { environment } from './../../environments/environment';

export class TipoFilter {
  nome: string;
  pagina = 0;
  itensPorPagina = corePag.itensPorPagina;
}

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  tiposUrl: string;

  constructor(private http: MasterHttp) {
    this.tiposUrl = `${environment.apiUrl}/tipos`;
  }

  pesquisar(filtro: TipoFilter): Promise<any> {
    let params = new HttpParams({
        fromObject: {
          page: filtro.pagina.toString(),
          size: filtro.itensPorPagina.toString()
        }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.tiposUrl}`, { params })
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

  pesquisarTodos(valor: any): Promise<any> {
    return this.http.get<Tipo>(`${this.tiposUrl}/search/${valor}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  adicionar(tipo: Tipo): Promise<any> {
    return this.http.post(`${this.tiposUrl}`, tipo)
      .toPromise();
  }

  buscarPorCodigo(id: number): Promise<Tipo> {
    return this.http.get<Tipo>(`${this.tiposUrl}/${id}`)
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

    return this.http.delete<any>(`${this.tiposUrl}/${id}`, { params })
      .toPromise()
      .then(response => {
          return response;
      });
  }

}
