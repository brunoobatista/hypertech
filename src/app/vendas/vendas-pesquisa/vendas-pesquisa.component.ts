import { Component, OnInit, HostBinding } from '@angular/core';
import { VendaFilter, VendasService } from '../vendas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ModalService } from 'src/app/core/modal.service';
import { ToastyService } from 'ng2-toasty';
import { StatusVenda } from 'src/app/model/Venda';

@Component({
  selector: 'app-vendas-pesquisa',
  templateUrl: './vendas-pesquisa.component.html',
  styleUrls: ['./vendas-pesquisa.component.css']
})
export class VendasPesquisaComponent implements OnInit {

  exclusaoModal = 'exclusaoModal';
  vendas = [];
  statusVenda;

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
  ) {

  }

  ngOnInit() {
    this.statusVenda = new StatusVenda();
    this.pesquisar(0);

  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.vendaService.pesquisar(this.filtro)
      .then(response => {
        this.vendas = response.content[0];
        //this.statusVenda = response.content[1];

        this.totalPages = response.totalPages;
        this.number = response.number;
        this.totalElements = response.totalElements;
        this.size = response.size;
      })
      .catch(error => this.errorHandler.handle(error));
  }

  cancelarVenda(venda: any, id: string) {
    this.vendaService.cancelar(venda)
      .then(response => {
        console.log(response);
        venda.status = response.status;
        this.toasty.success('Venda cancelada.');
      })
      .catch(error => this.errorHandler.handle(error));
      this.closeModal(id);
  }

  excluirVenda(venda: any, id: string) {
    console.log(venda)
    /*this.vendaService.cancelar(venda)
      .then(response => {
        console.log(response);
        venda.status = response.status;
        this.toasty.success('Venda excluída.');
      })
      .catch(error => this.errorHandler.handle(error));*/
      this.closeModal(id);
  }

  openModal(id: string, venda: any) {
    this.vendaModal = venda;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
