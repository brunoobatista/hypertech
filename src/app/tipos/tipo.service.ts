import { Injectable } from '@angular/core';
import { MasterHttp } from './../seguranca/master-http';
import { HttpParams } from '@angular/common/http';
import { Tipo } from './../model/Tipo';


import { environment } from './../../environments/environment';

export class TipoFilter {
  tipo: string;
  pagina = 0;
  itensPorPagina = 10;
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
    const params = new HttpParams({
      fromObject: {
         page: filtro.pagina.toString(),
         size: filtro.itensPorPagina.toString()
      }
   });

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

  adicionar(tipo: Tipo): Promise<any> {
    return this.http.post(`${this.tiposUrl}`, tipo)
      .toPromise();
  }

  buscarPorCodigo(id: number): Promise<Tipo> {
    return this.http.get<Tipo>(`${this.tiposUrl}/${id}`)
      .toPromise();
  }

  excluir(id: number, posicaoDaPagina: number, itensPorPagina: number): Promise<any> {
    const dadosPagina = posicaoDaPagina + itensPorPagina - 1;

    const params = new HttpParams({
       fromObject: {
          page: `${posicaoDaPagina}`,
          size: `${itensPorPagina}`
       }
    });


    return this.http.delete<any>(`${this.tiposUrl}/${id}`)
      .toPromise()
      .then(response => {
           return this.buscarProximo(params, dadosPagina);
      });

 }

  buscarProximo(params, dadosPagina): Promise<any> {
    return this.http.get<any>(`${this.tiposUrl}`, { params })
    .toPromise()
    .then(resp => {
      const resultado = {
          tipos: resp.content,
          total: resp.totalElements
      };
      return (resultado.total + 1) < dadosPagina ? null : resultado;
    });
  }
}
