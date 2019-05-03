import { Component, OnInit } from '@angular/core';

import { ClienteFilter, ClienteService } from '../cliente.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { ModalService } from 'src/app/core/modal.service';

@Component({
  selector: 'app-clientes-pesquisa',
  templateUrl: './clientes-pesquisa.component.html',
  styleUrls: ['./clientes-pesquisa.component.css']
})
export class ClientesPesquisaComponent implements OnInit {

  clientes = [];
  filtro = new ClienteFilter();

  totalPages;
  number;
  totalElements;
  size;

  clienteModal;

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private toastyService: ToastyService,
    private modalService: ModalService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  aoMudarPagina(event) {
    this.pesquisar(event);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.clienteService.pesquisar(this.filtro)
      .then(response => {
        this.clientes = response.content;
        this.totalPages = response.totalPages;
        this.number = response.number;
        this.totalElements = response.totalElements;
        this.size = response.size;
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  openModal(id: string, cliente: any) {
    this.clienteModal = cliente;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  excluirCliente(cliente: any, idModal: string) {
    this.clienteService.excluirCliente(cliente.id, this.number, this.size)
      .then(response => {
        const index = this.clientes.indexOf(cliente);
        this.clientes.splice(index, 1);

        if (response !== undefined) {
          this.clientes.push(response);
        }

        this.totalElements--;
        this.toastyService.success('Cliente excluído!');
      })
      .catch(error => this.errorHandlerService.handle(error));

    this.closeModal(idModal);
  }

}
