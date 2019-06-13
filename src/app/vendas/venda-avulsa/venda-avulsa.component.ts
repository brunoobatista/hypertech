import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/seguranca/auth.service';
import { ModalService } from 'src/app/core/modal.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ProdutoService } from 'src/app/produtos/produto.service';
import { VendasService } from '../vendas.service';

import { environment } from './../../../environments/environment';
import { ClienteService } from 'src/app/clientes/cliente.service';

import { ToastyService } from 'ng2-toasty';
import { Produto } from 'src/app/model/Produto';
import { VendaProduto } from 'src/app/model/VendaProduto';

@Component({
  selector: 'app-venda-avulsa',
  templateUrl: './venda-avulsa.component.html',
  styleUrls: ['./venda-avulsa.component.css']
})
export class VendaAvulsaComponent implements OnInit {

  exclusaoProduto = 'exclusaoProduto';
  produtoModal;

  titulo: any;
  produtosPesquisa = [];

  clientesPesquisa = [];
  allCliente = [];
  clienteLoading = false;

  cliente: any;

  @ViewChild('inputProduto', {read: ElementRef}) inputProduto: any;
  @ViewChild('divLiveSearch', {read: ElementRef}) divLiveSearch: any;
  @ViewChild('botaoFinalizar', {read: ElementRef}) botaoFinalizar: any;

  formulario: FormGroup;
  formularioTemp = [];
  formBuilder = new FormBuilder();

  tempo: any;
  listaTemp: Map<number, object> = new Map<number, object>();
  produtoTemp: any;

  venda: any;
  vendaUrl: string;

  constructor(
    private modalService: ModalService,
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private vendasService: VendasService,
    private errorHadler: ErrorHandlerService,
    private render2: Renderer2,
    private auth: AuthService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toasty: ToastyService,
  ) {
    this.vendaUrl = `${environment.apiUrl}/vendas`;
  }

  ngOnInit() {
    this.configurarFormulario();
    const idVenda = this.activateRoute.snapshot.params['id'];

    if (idVenda) {
      this.carregarVenda(idVenda);
    } else {
      this.titulo = '';
    }
    this.botaoFinalizar.nativeElement.disabled = true;
    this.onChange();
  }

  onChange() {
    const array = ['clienteId', 'desconto', 'observacao'];
    this.formulario.valueChanges.subscribe(val => {
      for (const prop in this.formulario.value) {
        if (prop) {
          if (array.indexOf(prop) >= 0 &&
          this.formulario.value[prop] !== this.formularioTemp[prop]) {
            this.botaoFinalizar.nativeElement.disabled = true;
            break;
          } else {
            this.botaoFinalizar.nativeElement.disabled = false;
          }
          if (prop === 'produtos') {
            for (const {item, index} of this.formulario.value[prop].map((item, index) => ({item, index})) ) {
              if (this.formularioTemp['produtos'].length > 0) {
                if (Number(item.produto.quantidade) !== Number(this.formularioTemp['produtos'][index].quantidade)) {
                  this.botaoFinalizar.nativeElement.disabled = true;
                  break;
                } else {
                  this.botaoFinalizar.nativeElement.disabled = false;
                }
              } else {
                this.botaoFinalizar.nativeElement.disabled = true;
              }
            }
          }
          if (this.botaoFinalizar.nativeElement.disabled) {
            break;
          }
        }
      }
    });
  }

  carregarVenda(id: number) {
    this.vendasService.buscarPorCodigo(id)
      .then(response => {
        this.formulario.patchValue(response);
        if (response.cliente) {
          this.preencherClienteFormulario(response.cliente);
          this.titulo = '#' + id;
        }
        this.preencherProdutosFormulario(response.produtos);
        this.ativarBotaoFinalizar();
      })
      .catch(erro => this.errorHadler.handle(erro));
  }

  salvarVenda() {
    this.vendasService.salvar(this.formulario.value)
      .then(response => {
        if (!this.formulario.get('id').value) {
          this.formulario.patchValue(response);
          this.atualizarIdVendaRoute(response.id);
        } else {
          this.formulario.patchValue(response);
        }
        this.toasty.success('Venda salva!');
        this.preencherProdutosFormulario(response.produtos);
        this.ativarBotaoFinalizar();
      })
      .catch(error => this.errorHadler.handle(error));
  }

  ativarBotaoFinalizar() {
    this.formularioTemp = this.formulario.value;
    this.formularioTemp['produtos'] = [];
    for (const item of this.formulario.get('produtos').value) {
      const vp = new VendaProduto();
      vp.quantidade = item.quantidade;
      vp.id = item.id;
      vp.produto = item.produto;
      this.formularioTemp['produtos'].push(vp);
    }
    this.botaoFinalizar.nativeElement.disabled = false;
  }

  finalizarVenda() {
    this.vendasService.salvarFinalizar(this.formulario.value)
      .then(response => {
        this.router.navigate(['/vendas']);
      })
      .catch(error => this.errorHadler.handle(error));
  }

  atualizarVenda() {
    let valor = 0;
    const produtos = this.formulario.get('produtos').value;
    produtos.forEach(p => {
      valor += p.produto.valor * p.quantidade;
    });
    this.formulario.get('valor').setValue(valor);
  }

  preencherProdutosFormulario(produtos: any[]) {
    this.formulario.get('produtos').setValue([]);
    produtos.forEach(p => {
      this.formulario.get('produtos').value.push(p);
    });
  }

  preencherClienteFormulario(cliente: any) {
    this.allCliente.push(cliente);
    this.clientesPesquisa = [...this.allCliente];
  }

  atualizarIdVendaRoute(id: number) {
    this.titulo = '#' + id;
    window.history.replaceState({},
      '', `/vendas/${id}`);
  }

  inputValorProdutoAlterado(event, item) {
    let valor = event.target.value;
    if (valor > (item.produto.estoque - item.produto.reserva)) {
      valor = item.produto.estoque - item.produto.reserva;
    }
    item.quantidade = valor;

    this.atualizarVenda();
  }

  calculaValorTotal(): number {
    return this.formulario.get('valor').value - this.formulario.get('desconto').value;
  }

  retirarItemDaLista(idModal, produto) {
    this.produtoModal = produto;
    this.openModal(idModal);
  }

  excluirItem(item: any, idModal) {
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
    if (idFormulario && item.id) {
      this.vendasService.removerProduto(idFormulario, item.produto.id)
        .then(response => {
          this.formulario.patchValue(response);
          this.preencherProdutosFormulario(response.produtos);
          this.ativarBotaoFinalizar();
        });
    }
    this.closeModal(idModal);
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
      if (this.tempo) {
        clearTimeout(this.tempo);
      }
      this.tempo = setTimeout(() => {
        this.produtoService.pesquisarTodos(value)
        .then(response => {
          this.produtosPesquisa = response;
          this.listaProdutosPesquisa(this.produtosPesquisa);
        })
        .catch(error => this.errorHadler.handle(error));
      }, 500);
    }
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

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      dataVenda: [formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss', 'pt')],
      usuario: this.formBuilder.group({
        id: [this.auth.jwtPayload.id]
      }),
      cliente: [null],
      clienteId: [null],
      produtos: this.formBuilder.array([]),
      valor: [0],
      desconto: [0],
      observacao: [''],
      status: ['']
    });

    this.formularioTemp = this.formulario.value;
    //console.log('testmp', this.formularioTemp);
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
      const htEstoque = this.render2.createText('Estoque');
      const htReserva = this.render2.createText('Reserva');
      const htValor = this.render2.createText('Valor R$');

      const hsNome = this.render2.createElement('span');
      this.render2.setAttribute(hsNome, 'class', 'col-md-6');
      const hsEstoque = this.render2.createElement('span');
      this.render2.setAttribute(hsEstoque, 'class', 'col-md-2 text-center');
      const hsReserva = this.render2.createElement('span');
      this.render2.setAttribute(hsReserva, 'class', 'col-md-2 text-center');
      const hsValor = this.render2.createElement('span');
      this.render2.setAttribute(hsValor, 'class', 'col-md-2 text-center');

      this.render2.appendChild(hsNome, htNome);
      this.render2.appendChild(hsEstoque, htEstoque);
      this.render2.appendChild(hsReserva, htReserva);
      this.render2.appendChild(hsValor, htValor);

      this.render2.appendChild(liHead, hsNome);
      this.render2.appendChild(liHead, hsEstoque);
      this.render2.appendChild(liHead, hsReserva);
      this.render2.appendChild(liHead, hsValor);
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
        const reserva = this.render2.createText(p.reserva ? p.reserva : '0');
        const valor = this.render2.createText(p.valor);

        const spanNome = this.render2.createElement('span');
        this.render2.setAttribute(spanNome, 'class', 'col-md-6');
        const spanEstoque = this.render2.createElement('span');
        this.render2.setAttribute(spanEstoque, 'class', 'col-md-2 text-center acert-padding');
        const spanReserva = this.render2.createElement('span');
        this.render2.setAttribute(spanReserva, 'class', 'col-md-2 text-center acert-padding');
        const spanValor = this.render2.createElement('span');
        this.render2.setAttribute(spanValor, 'class', 'col-md-2 text-center acert-padding');

        this.render2.appendChild(spanNome, nome);
        this.render2.appendChild(spanEstoque, estoque);
        this.render2.appendChild(spanReserva, reserva);
        this.render2.appendChild(spanValor, valor);

        this.render2.appendChild(li, spanNome);
        this.render2.appendChild(li, spanEstoque);
        this.render2.appendChild(li, spanReserva);
        this.render2.appendChild(li, spanValor);
        this.render2.appendChild(ulbody, li);
      }

      // adiciona as divs filhos na div pai
      this.render2.appendChild(div, ulhead);
      this.render2.appendChild(div, ulbody);
    }

  }

  openModal(id: string) {
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

}
