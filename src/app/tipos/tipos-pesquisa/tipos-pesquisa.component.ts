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
  paginate;
  pages = [];
  page;

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

        this.pages.push(0);
        if (response.first) {
          this.page = 0;
          this.pages.push(1);
          this.pages.push(2);
          this.pages.push(3);
          this.pages.push(4);
        } else if (response.last) {
          this.page = response.totalPages - 1;
          this.pages.push(response.totalPages - 5);
          this.pages.push(response.totalPages - 4);
          this.pages.push(response.totalPages - 3);
          this.pages.push(response.totalPages - 2);
        }

        if (response.number ) {

        }


        this.pages.push(response.totalPages - 1);
        console.log(this.pages)
      })
      .catch(error => this.errorHandler.handle(error));
  }

  gerarPages(totalPages) {
    for (let x = 0; x < totalPages; x++) {
      this.pages.push(x);
    }
  }

}
