import { Component, OnInit } from '@angular/core';
import { VendaFilter, VendasService } from '../vendas.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ModalService } from 'src/app/core/modal.service';
import { ToastyService } from 'ng2-toasty';
import { StatusVenda } from 'src/app/model/Venda';
import { ClienteService } from 'src/app/clientes/cliente.service';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-vendas-pesquisa',
  templateUrl: './vendas-pesquisa.component.html',
  styleUrls: ['./vendas-pesquisa.component.css']
})
export class VendasPesquisaComponent implements OnInit {

  exclusaoModal = 'exclusaoModal';
  vendas = [];
  statusVenda;

  vendaDe: Date;

  filtro = new VendaFilter();
  totalPages;
  number;
  totalElements;
  size;

  vendaModal;

  clientesPesquisa = [];
  allCliente = [];
  clienteLoading = false;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(
    private vendaService: VendasService,
    private clienteService: ClienteService,
    private errorHandler: ErrorHandlerService,
    private modalService: ModalService,
    private toasty: ToastyService,
  ) {
    this.bsConfig = Object.assign({}, {
      dateInputFormat: 'DD/MM/YYYY',
    });
  }

  ngOnInit() {
    this.statusVenda = new StatusVenda();
    this.pesquisar(0);

  }

  pesquisarFiltro() {
    if (this.filtro.vendaDe) {
      this.filtro.vendaDe = new Date(this.filtro.vendaDe);
      this.filtro.vendaDe.setHours(0, 0, 0);
    }
    if (this.filtro.vendaAte) {
      this.filtro.vendaAte = new Date(this.filtro.vendaAte);
      this.filtro.vendaAte.setHours(23, 59, 59);
    }
    this.pesquisar(this.filtro.pagina);
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
        venda.status = response.status;
        this.toasty.success('Venda cancelada.');
      })
      .catch(error => this.errorHandler.handle(error));
      this.closeModal(id);
  }

  excluirVenda(venda: any, id: string) {
    this.vendaService.remover(venda.id, this.number, this.size)
      .then(response => {
        const index = this.vendas.indexOf(venda);
        this.vendas.splice(index, 1);
        if (response !== null && response !== undefined) {
          this.vendas.push(response);
        }
        this.totalElements--;
        this.toasty.success('Venda excluída.');
      })
      .catch(error => this.errorHandler.handle(error));
      this.closeModal(id);
  }

  pesquisarCliente(event) {
    if (event) {
      const value = event.term;

      if (value.length >= 3) {
        this.clienteLoading = true;
        this.clienteService.pesquisarTodos(value)
        .then(response => {
          this.clientesPesquisa = response;
          this.clienteLoading = false;
        });
      }
    }
  }

  aoMudarPagina(event) {
    this.pesquisar(event);
  }

  preencherClienteFormulario(cliente: any) {
    this.allCliente.push(cliente);
    this.clientesPesquisa = [...this.allCliente];
  }

  openModal(id: string, venda: any) {
    this.vendaModal = venda;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
