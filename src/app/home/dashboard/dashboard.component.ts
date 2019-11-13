import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HomeService } from '../home.service';
import { HighchartsService } from '../../core/highcharts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('charts') public chartEl: ElementRef;
  @ViewChild('totalVendasXDias') public totalVendasXDiasEl: ElementRef;
  @ViewChild('totalVendasXDias2') public totalVendasXDias2El: ElementRef;
  vendasXDIa = [];

  constructor(
    private homeService: HomeService,
    private highcharts: HighchartsService,
  ) { }

  ngOnInit() {
    this.renderTotalVendasXDIa();
    this.highcharts.createChart(this.chartEl.nativeElement, this.myOptions);
  }

  renderTotalVendasXDIa() {
    this.homeService.getTotalVendasPorDia()
      .then(response => {
        const result = {dias: [], quantidade: [], expectativa: [], expectativa2: []};
        for (let resp of response) {
          result.dias.push(resp[0]);
          result.quantidade.push(resp[1]);
          result.expectativa.push(resp[1] * 2);
          result.expectativa2.push(resp[1] * 6);
        }
        console.log(result);
        this.vendasXDIa = response;
        const options = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Total de Vendas X Dias'
          },
          xAxis: {
            categories: result.dias,
            title: {
              text: 'Data da Venda'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Total vendas'
            }
          },
          legend: {
            reversed: true
          },
          plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
          series: [{
            name: 'Quantidade',
            data: result.quantidade
          },
          {
            name: 'Expectativa',
            data: result.expectativa
          }]
        };
        const options2 = {
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Total de Vendas X Dias'
          },
          xAxis: {
            categories: result.dias,
            title: {
              text: 'Data da Venda'
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Total vendas'
            }
          },
          legend: {
            reversed: true
          },
          plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            
        },
          series: [{
            name: 'Quantidade',
            data: result.quantidade
          },
          {
            name: 'Expectativa',
            data: result.expectativa
          },
          {
            name: 'Expectativa2',
            data: result.expectativa2
          }]
        };
        this.highcharts.createChart(this.totalVendasXDiasEl.nativeElement, options);
        this.highcharts.createChart(this.totalVendasXDias2El.nativeElement, options2);
      });
  }

  myOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Stacked bar chart'
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'John',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Jane',
      data: [2, 2, 3, 2, 1]
    }, {
      name: 'Joe',
      data: [3, 4, 4, 2, 5]
    }]
  };

}
