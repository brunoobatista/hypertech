import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';

import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments/environment';
import { Venda } from '../model/Venda';

export class VendaFilter {
  vendaDe: Date;
  vendaAte: Date;
  pagina = 0;
  itensPorPagina = 15;
}

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  vendaUrl: string;

  constructor(private http: MasterHttp) {
    this.vendaUrl = `${environment.apiUrl}/vendas`;
  }

  adicionar(venda: Venda): Promise<any> {
    return this.http.post<Venda>(this.vendaUrl, venda)
      .toPromise();
  }

  pesquisar(filtro: VendaFilter): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.vendaUrl}`, { params })
        .toPromise()
        .then(response => {
          console.log('find page venda', response)
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
