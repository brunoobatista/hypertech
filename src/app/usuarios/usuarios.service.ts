import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { MasterHttp } from '../seguranca/master-http';

import { environment } from './../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Usuario } from '../model/Usuario';

import * as corePag from '../core/core-pagination';

export class UsuarioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = corePag.itensPorPagina;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarioUrl: string;

  constructor(private http: MasterHttp) {
    this.usuarioUrl = `${environment.apiUrl}/usuarios`;
  }

  listarPermissoes(): Promise<any> {
    return this.http.get<any>(`${this.usuarioUrl}/permissoes`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  salvar(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>(this.usuarioUrl, usuario)
              .toPromise();
  }

  pesquisarTodos(valor: any): Promise<any> {
    return this.http.get<any>(`${this.usuarioUrl}/search/${valor}`)
      .toPromise();
  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(this.usuarioUrl, { params })
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

  buscarPorCodigo(id) {
    return this.http.get<any>(`${this.usuarioUrl}/${id}`)
      .toPromise();
  }

  desativarUsuario(id: number, posicaoPagina, itensPorPagina): Promise<any> {
    const dados = (posicaoPagina + 1) * itensPorPagina;

    const params = new HttpParams({
      fromObject: {
        page: `${dados}`,
        size: '1',
      }
    });

    return this.http.delete<any>(`${this.usuarioUrl}/${id}`, { params })
      .toPromise()
      .then(response => {
        return response;
      });

  }

}
