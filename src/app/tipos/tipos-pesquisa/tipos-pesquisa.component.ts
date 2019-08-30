import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { TipoService } from '../tipo.service';
import { TipoFilter } from './../tipo.service';

import { ToastyService } from 'ng2-toasty';

import { ModalService } from '../../core/modal.service';

@Component({
  selector: 'app-tipos-pesquisa',
  templateUrl: './tipos-pesquisa.component.html',
  styleUrls: ['./tipos-pesquisa.component.css']
})
export class TiposPesquisaComponent implements OnInit {

  tipos = [];
  filtro = new TipoFilter();

  totalPages;
  number;
  totalElements;
  size;

  tipoModal;

  constructor(
    private tipoService: TipoService,
    private errorHandler: ErrorHandlerService,
    private modalService: ModalService,
    private toasty: ToastyService,
    ) {

  }

  aoMudarPagina(event) {
    this.pesquisar(event);
  }

  ngOnInit() {
    this.pesquisar(0);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.tipoService.pesquisar(this.filtro)
      .then(response => {
        this.tipos = response.content;

        this.totalPages = response.totalPages;
        this.number = response.number;
        this.totalElements = response.totalElements;
        this.size = response.size;

      })
      .catch(error => this.errorHandler.handle(error));
  }

  openModal(id: string, botaoExcluir: any, tipo: any) {
    this.tipoModal = tipo;
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  excluirTipo(tipo: any, idModal: string) {
    this.tipoService.excluir(tipo.id, this.number, this.size)
      .then(response => {
          const index = this.tipos.indexOf(tipo);
          this.tipos.splice(index, 1);
          if (response !== null && response !== undefined) {
            this.tipos.push(response);
          }
          this.totalElements--;
          this.toasty.success('Tipo exclúido');
      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
    this.modalService.close(idModal);
 }

}
