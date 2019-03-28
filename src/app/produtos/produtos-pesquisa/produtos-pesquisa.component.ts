import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ProdutoFilter, ProdutoService } from '../produto.service';

import { ToastyService } from 'ng2-toasty';
import { ModalService } from 'src/app/core/modal.service';

@Component({
  selector: 'app-produtos-pesquisa',
  templateUrl: './produtos-pesquisa.component.html',
  styleUrls: ['./produtos-pesquisa.component.css']
})
export class ProdutosPesquisaComponent implements OnInit {

  produtos = [];
  filtro = new ProdutoFilter();

  totalPages;
  number;
  totalElements;
  size;

  produtoModal;

  constructor(
    private produtoService: ProdutoService,
    private errorHanlder: ErrorHandlerService,
    private modalService: ModalService,
    private toasty: ToastyService
  ) { }

  ngOnInit() {
    this.pesquisar(0);
  }

  aoMudarPagina(event) {
    this.pesquisar(event);
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.produtoService.pesquisar(this.filtro)
      .then(response => {
        this.produtos = response.content;

        this.totalPages = response.totalPages;
        this.number = response.number;
        this.totalElements = response.totalElements;
        this.size = response.size;
      })
      .catch(error => this.errorHanlder.handle(error));
  }

  openModal(id: string, botaoExcluir: any, tipo: any) {
    this.produtoModal = tipo;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  excluirProduto(produto: any, idModal: string) {
    this.produtoService.excluir(produto.id, this.number, this.size)
      .then(response => {
        /*if (this.produtos.length === 0) {
          this.pesquisar(0);
        }
        if (response !== null) {
          this.produtos = response;
        }*/
        this.totalElements--;
        this.toasty.success('Produto excluído!');
        this.pesquisar(0);
      })
      .catch(error => {
        this.errorHanlder.handle(error);
      });
      this.modalService.close(idModal);
  }

}
