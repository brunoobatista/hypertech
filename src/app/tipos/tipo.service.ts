import { Injectable } from '@angular/core';
import { MasterHttp } from './../seguranca/master-http';
import { Tipo } from './../model/Tipo';

import { environment } from './../../environments/environment';

import 'rxjs';
import { HttpParams } from '@angular/common/http';

export class TipoFilter {
  tipo: string;
  pagina = 0;
  itensPorPagina = 2;
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

}
