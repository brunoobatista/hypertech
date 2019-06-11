import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ProdutoFilter, ProdutoService } from '../produto.service';

import { ToastyService } from 'ng2-toasty';
import { ModalService } from 'src/app/core/modal.service';
import { TipoService } from 'src/app/tipos/tipo.service';
import { Produto } from 'src/app/model/Produto';

@Component({
  selector: 'app-produtos-pesquisa',
  templateUrl: './produtos-pesquisa.component.html',
  styleUrls: ['./produtos-pesquisa.component.css']
})
export class ProdutosPesquisaComponent implements OnInit {

  adicionarEstoque = 'adicionarEstoque';
  produtos = [];
  tipos = [];

  filtro = new ProdutoFilter();

  totalPages;
  number;
  totalElements;
  size;

  produtoModal = new Produto();

  constructor(
    private produtoService: ProdutoService,
    private errorHanlder: ErrorHandlerService,
    private modalService: ModalService,
    private tipoService: TipoService,
    private toasty: ToastyService
  ) { }

  ngOnInit() {
    this.pesquisar(0);
    this.tipoService.pesquisarTodos('')
      .then(response => {
        this.tipos = response;
      });
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

  openModal(id: string, produto: any) {
    this.produtoModal = produto;
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  excluirProduto(produto: any, idModal: string) {
    this.produtoService.excluir(produto.id, this.number, this.size)
      .then(response => {
          const index = this.produtos.indexOf(produto);
          this.produtos.splice(index, 1);
          if (response !== null && response !== undefined) {
            this.produtos.push(response);
          }
          this.totalElements--;
          this.toasty.success('Produto excluído!');
      })
      .catch(error => {
        this.errorHanlder.handle(error);
      });
    this.modalService.close(idModal);
  }

  adicionarUnidades(produtoId, inputValor, idModal) {
    this.produtoService.adicionarUnidadesProduto(produtoId, Number(inputValor.value))
      .then(response => {
        this.produtos.forEach(p => {
          if (p.id === response.id) {
            p.estoque = response.estoque;
          }
        });
      })
      .catch(error => this.errorHanlder.handle(error));
    inputValor.value = null;
    this.closeModal(idModal);
  }

}
