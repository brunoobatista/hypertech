import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html',
  styleUrls: ['./header-inner.component.scss']
})
export class HeaderInnerComponent implements OnInit {

  dataCriado: any;
  usuario: any;
  constructor(
    private auth: AuthService,
  ) {
    this.usuario = this.auth.jwtPayload;
    const data = this.usuario.created_at;
    if (data) {
      this.dataCriado = formatDate(`${data.year}/${data.month}/${data.dayOfMonth}`, 'MMMM, yyyy', 'pt');
    }
  }

  ngOnInit() {
  }


}
