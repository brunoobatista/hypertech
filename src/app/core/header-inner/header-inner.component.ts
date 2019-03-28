import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})
export class HeaderInnerComponent implements OnInit {

  usuario: any;
  constructor(
    private auth: AuthService,
  ) {
    this.usuario = this.auth.jwtPayload;
  }

  ngOnInit() {
  }


}
