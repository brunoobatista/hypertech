import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { FornecedorService, FornecedorFilter } from './../fornecedor.service';

import { ToastyService } from 'ng2-toasty';
import { ModalService } from '../../core/modal.service';


@Component({
  selector: 'app-fornecedores-pesquisa',
  templateUrl: './fornecedores-pesquisa.component.html',
  styleUrls: ['./fornecedores-pesquisa.component.css']
})
export class FornecedoresPesquisaComponent implements OnInit {

  fornecedores = [];
  filtro = new FornecedorFilter();

  totalPages;
  number;
  totalElements;
  size;

  fornecedorModal;

  constructor(
    private fornecedorService: FornecedorService,
    private errorHandler: ErrorHandlerService,
    private modalService: ModalService,
    private toasty: ToastyService,
  ) { }

  aoMudarPagina(event) {
    this.pesquisar(event);
  }

  ngOnInit() {
    this.pesquisar(0);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.fornecedorService.pesquisar(this.filtro)
      .then(response => {
        this.fornecedores = response.content;

        this.totalPages = response.totalPages;
        this.number = response.number;
        this.totalElements = response.totalElements;
        this.size = response.size;

      })
      .catch(error => this.errorHandler.handle(error));
  }

  openModal(id: string, botaoExcluir: any, tipo: any) {
    this.fornecedorModal = tipo;
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  excluirFornecedor(tipo: any, idModal: string) {
    this.fornecedorService.excluir(tipo.id, this.number, this.size)
    .then(response => {
          if (this.fornecedores.length === 0) {
            this.pesquisar(0);
          }
          if (response !== null) {
            this.fornecedores = response;
          }
          this.totalElements--;
          this.toasty.success('Fornecedor exclúido');
      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
      this.modalService.close(idModal);
 }

}
