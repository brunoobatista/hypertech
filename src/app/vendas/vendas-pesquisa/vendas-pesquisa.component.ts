import { Component, OnInit } from '@angular/core';
import { VendaFilter, VendasService } from '../vendas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ModalService } from 'src/app/core/modal.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vendas-pesquisa',
  templateUrl: './vendas-pesquisa.component.html',
  styleUrls: ['./vendas-pesquisa.component.css']
})
export class VendasPesquisaComponent implements OnInit {

  vendas = [];
  filtro = new VendaFilter();
  totalPages;
  number;
  totalElements;
  size;

  vendaModal;

  constructor(
    private vendaService: VendasService,
    private errorHandler: ErrorHandlerService,
    private modalService: ModalService,
    private toasty: ToastyService,
  ) { }

  ngOnInit() {
    this.pesquisar(0);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.vendaService.pesquisar(this.filtro)
      .then(response => {
        console.log('venda comp pesq', response);
      })
      .catch(error => this.errorHandler.handle(error));
  }

}
