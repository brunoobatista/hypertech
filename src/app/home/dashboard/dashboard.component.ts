import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  vendasXDIa = [];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.renderTotalVendasXDIa();
  }

  renderTotalVendasXDIa() {
    this.homeService.getTotalVendasPorDia()
      .then(response => {
        console.log(response);
        this.vendasXDIa = response;
      });
  }

}
