import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { TipoService } from '../tipo.service';
import { TipoFilter } from './../tipo.service';

@Component({
  selector: 'app-tipos-pesquisa',
  templateUrl: './tipos-pesquisa.component.html',
  styleUrls: ['./tipos-pesquisa.component.css']
})
export class TiposPesquisaComponent implements OnInit {

  tipos = [];
  filtro = new TipoFilter();
  pages = [];
  ultimaPagina;
  endPage;
  currentPage;

  constructor(
    private tipoService: TipoService,
    private cdRef: ChangeDetectorRef,
    private errorHandler: ErrorHandlerService
    ) {

  }

  ngOnInit() {
    this.pesquisar(0);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.tipoService.pesquisar(this.filtro)
      .then(response => {
        this.tipos = response.content;
        this.pages = this.gerarPages(response.totalPages, response.number, response.totalElements, response.size);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  gerarPages(totalPages, number, totalElements, rows) {
    let startPage = (number < 3) ? 1 : number - 2;
    let endPage = 4 + startPage;
    endPage = (totalPages < endPage) ? totalPages : endPage;
    const diff = startPage - endPage + 4;
    startPage -= (startPage - diff > 0) ? diff : 0;
    const array = [];


    for (let i = startPage ; i <= endPage; i++) {
      array.push(i);
    }
    this.ultimaPagina = Math.ceil(totalElements / rows);
    this.endPage = endPage;
    this.currentPage = number;

    return array;
  }

}
