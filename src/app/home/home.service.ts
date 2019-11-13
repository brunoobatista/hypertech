import { Injectable } from '@angular/core';
import { MasterHttp } from '../seguranca/master-http';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  homeUrl: string;

  constructor(private http: MasterHttp) {
    this.homeUrl = `${environment.apiUrl}/dashboard`;
  }

  getTotalVendasPorDia(): Promise<any> {
    return this.http.get<any>(`${this.homeUrl}/get_total_vendas`)
      .toPromise();
  }

}
