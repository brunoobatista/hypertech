import { Injectable } from '@angular/core';
import { MasterHttp } from './../seguranca/master-http';
import { Tipo } from './../model/Tipo';

import { environment } from './../../environments/environment';

import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

  tiposUrl: string;

  constructor(private http: MasterHttp) {
    this.tiposUrl = `${environment.apiUrl}/tipos`;
  }

  pesquisar(): Promise<any> {
    return this.http.get<any>(`${this.tiposUrl}`)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  adicionar(tipo: Tipo): Promise<any> {

    return this.http.post(`${this.tiposUrl}`, tipo)
      .toPromise();
  }

}
