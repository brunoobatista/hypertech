import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { formatDate } from '@angular/common';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { Router } from '@angular/router';
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
    private logoutService: LogoutService,
    private router: Router
  ) {
    this.usuario = this.auth.jwtPayload;
    const data = this.usuario.created_at;
    if (data) {
      this.dataCriado = formatDate(`${data.year}/${data.month}/${data.dayOfMonth}`, 'MMMM, yyyy', 'pt');
    }
  }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
       .then(() => {
          this.router.navigate(['/login']);
       })
       .catch(error => console.log(error));
   }


}
