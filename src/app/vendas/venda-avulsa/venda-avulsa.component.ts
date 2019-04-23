import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/seguranca/auth.service';
import { ModalService } from 'src/app/core/modal.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ProdutoService, ProdutoFilter } from 'src/app/produtos/produto.service';
import { VendasService } from '../vendas.service';

import { Venda } from 'src/app/model/Venda';
import { Produto } from 'src/app/model/Produto';
import { environment } from './../../../environments/environment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { t } from '@angular/core/src/render3';

@Component({
  selector: 'app-venda-avulsa',
  templateUrl: './venda-avulsa.component.html',
  styleUrls: ['./venda-avulsa.component.css']
})
export class VendaAvulsaComponent implements OnInit {

  titulo: any;
  produtosPesquisa = [];
  @ViewChild('inputProduto', {read: ElementRef}) inputProduto: any;
  @ViewChild('divLiveSearch', {read: ElementRef}) divLiveSearch: any;

  formulario: FormGroup;
  formBuilder = new FormBuilder();

  tempo: any;
  listaTemp: Map<number, object> = new Map<number, object>();
  produtoTemp: any;

  venda: any;
  vendaUrl: string;


  constructor(
    private modalService: ModalService,
    private produtoService: ProdutoService,
    private vendasService: VendasService,
    private errorHadler: ErrorHandlerService,
    private render2: Renderer2,
    private auth: AuthService,
    private route: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.vendaUrl = `${environment.apiUrl}/vendas`;
  }

  ngOnInit() {
    this.configurarFormulario();
    const idVenda = this.activateRoute.snapshot.params['id'];

    if (idVenda) {
      this.carregarVenda(idVenda);

      this.activateRoute.snapshot.data['title'] = `Venda #${idVenda}`;

    } else {
      this.titulo = 'Venda';
    }
  }

  carregarVenda(id: number) {
    this.vendasService.buscarPorCodigo(id)
      .then(response => {
        this.formulario.patchValue(response);

        response.produtos.forEach(p => {
          this.formulario.get('produtos').value.push(p);
        });
      })
      .catch(erro => this.errorHadler.handle(erro));
  }

  atualizarVenda() {
    if (this.tempo) {
      clearTimeout(this.tempo);
    }
    this.tempo = setTimeout(() => {
     this.vendasService.adicionar(this.formulario.value)
        .then(response => {
          console.log('atuatliza', response)
          if (response.id) {
            this.atualizarIdVendaRoute(response.id);
          }
        })
        .catch(error => this.errorHadler.handle(error));
    }, 2000);
  }

  atualizarIdVendaRoute(id: number) {
    this.formulario.get('id').setValue(id);

    const sub = this.activateRoute.data.subscribe(s => {
      console.log('id2', id, ' ==== ', s);
      s['title'] = `Venda #${id}`;
    });

    window.history.replaceState({},
      '', `/vendas/${id}`);
  }

  acrescentaQuantidade(item: any) {
      item.quantidade += 1;
      this.atualizarVenda();
  }

  decrementarQuantidade(item: any) {
    if (item.quantidade > 0) {
      item.quantidade -= 1;
      this.atualizarVenda();
    }
  }

  excluirItem(item: any) {
    const p1 = this.formulario.get('produtos').value;

    const novaLista = p1.filter(p => {
      if (p.produto.id !== item.produto.id) {
        return p;
      }
    } );
    this.formulario.get('produtos').patchValue([]);
    const p2 = this.formulario.get('produtos').value;
    novaLista.forEach(nl => p2.push(nl));

    const idFormulario = this.formulario.get('id').value;
    if (idFormulario) {
      this.vendasService.removerProduto(idFormulario, item.produto.id);
    }
  }

  selecionaProduto(event) {
    const produto = event.target.parentNode;
    const divPai = this.render2.parentNode(produto);
    Array.from(divPai.children).forEach(d => {
      this.render2.removeClass(d, 'item-selected');
    });
    this.render2.addClass(produto, 'item-selected');
    this.produtoTemp = this.listaTemp.get(  Number(produto.id) );
  }

  adicionarProduto(idModal) {
    if (this.produtoTemp) {
      const produtos = this.formulario.get('produtos').value;
      let notExist = true;
      produtos.forEach(p => {
        if (p.produto.id === this.produtoTemp.id) {
          notExist = false;
        }
      });

      if (notExist) {
        this.formulario.get('produtos').value.push({'produto': this.produtoTemp, 'quantidade': 0});
      } else {
        this.errorHadler.handle('Produto já incluso na venda!');
      }

      this.closeModal(idModal);
    }
  }

  limparProdutoTemp() {
    this.produtoTemp = null;
  }

  pesquisarProduto(event, idModal) {
    const input = this.inputProduto.nativeElement;
    const value = input.value;

    if (event.keyCode === 27) {
      this.closeModal(idModal);
      return;
    }

    if (event.keyCode === 8 && value.length < 3) {
      this.removeDivChildren(this.divLiveSearch.nativeElement);
    }

    if (value.length >= 3) {
      const filtro = new ProdutoFilter();
      filtro.nome = value;
      if (this.tempo) {
        clearTimeout(this.tempo);
      }
      this.tempo = setTimeout(() => {
        this.produtoService.pesquisar(filtro)
        .then(response => {
          this.produtosPesquisa = response.content;
          this.listaProdutosPesquisa(this.produtosPesquisa);
        })
        .catch(error => this.errorHadler.handle(error));
      }, 500);
    }
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      dataVenda: [formatDate(Date.now(), 'dd-MM-yyyy HH:mm:ss', 'pt')],
      usuario: this.formBuilder.group({
        id: [this.auth.jwtPayload.id]
      }),
      produtos: this.formBuilder.array([]),
      valor: [0.0],
    });
  }

  removeDivChildren(div: any) {
    Array.from(div.children).forEach(c => {
      this.render2.removeChild(div, c);
      this.listaTemp.clear();
    });
  }

  listaProdutosPesquisa(produtos = []) {
    const div = this.divLiveSearch.nativeElement;
    this.removeDivChildren(div);

    // Cria a div pai para cada produto que vier na pesquisa
    if (produtos.length > 0) {
      const ulhead = this.render2.createElement('div');
      this.render2.setAttribute(ulhead, 'class', 'live-search-list-head');
      const ulbody = this.render2.createElement('div');
      this.render2.setAttribute(ulbody, 'class', 'live-search-list');

      const liHead = this.render2.createElement('div');
      this.render2.setAttribute(liHead, 'class', 'row');
      const htNome = this.render2.createText('Nome');
      const htEstoque = this.render2.createText('Unidades disponíveis');

      const hsNome = this.render2.createElement('span');
      this.render2.setAttribute(hsNome, 'class', 'col-md-9');
      const hsEstoque = this.render2.createElement('span');
      this.render2.setAttribute(hsEstoque, 'class', 'col-md-3 text-center');

      this.render2.appendChild(hsNome, htNome);
      this.render2.appendChild(hsEstoque, htEstoque);

      this.render2.appendChild(liHead, hsNome);
      this.render2.appendChild(liHead, hsEstoque);
      this.render2.appendChild(ulhead, liHead);

      if (produtos.length > 5) {
        this.render2.addClass(ulbody, 'scroll-l');
      }

      // cria uma div para cara produto da pesquisa
      for (const p of produtos) {
        this.listaTemp.set(p.id, p);
        const li = this.render2.createElement('div');
        this.render2.setAttribute(li, 'id', p.id);

        this.render2.listen(li, 'click', this.selecionaProduto.bind(this));

        this.render2.setAttribute(li, 'class', 'body-live-list row');
        const nome = this.render2.createText(p.nome);
        const estoque = this.render2.createText(p.estoque);

        const spanNome = this.render2.createElement('span');
        this.render2.setAttribute(spanNome, 'class', 'col-md-9');
        const spanEstoque = this.render2.createElement('span');
        this.render2.setAttribute(spanEstoque, 'class', 'col-md-3 text-center');

        this.render2.appendChild(spanNome, nome);
        this.render2.appendChild(spanEstoque, estoque);

        this.render2.appendChild(li, spanNome);
        this.render2.appendChild(li, spanEstoque);
        this.render2.appendChild(ulbody, li);
      }

      // adiciona as divs filhos na div pai
      this.render2.appendChild(div, ulhead);
      this.render2.appendChild(div, ulbody);
    }

  }

  openModal(id: string, botaoExcluir: any, tipo: any) {
    this.modalService.open(id);
    this.inputProduto.nativeElement.focus();
  }

  cleanDataModal() {
    this.removeDivChildren(this.divLiveSearch.nativeElement);
    this.inputProduto.nativeElement.value = '';
    this.limparProdutoTemp();
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.cleanDataModal();
  }

  templateHeadModal() {
    const tp = `
          <div class="live-search-list-head">
            <div class="row">
              <span class="col-md-9">Nome</span>
              <span class="col-md-3 text-center">Unidades disponíveis</span>
            </div>
          </div>
    `;
  }
  templateModal() {
    return `


            <div id="1" class="body-live-list row">
              <span class="col-md-9">produto 1</span>
              <span class="col-md-3 text-center">654</span>
            </div>


    `;
  }

}
