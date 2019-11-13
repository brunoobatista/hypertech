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

  produtosList = [];

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

  adicionarProduto(produtosList) {
    if (produtosList.length > 0) {
      const ids = this.formulario.get('produtos').value.map(att => {
        return att.produto.id;
      });
      
      if (ids.length > 0) {
        produtosList.forEach(p => {
          if (ids.indexOf(p.id) < 0) {
            this.formulario.get('produtos').value.push({'produto': p, 'quantidade': 0});
          }
        });
      } else {
        produtosList.forEach(p => {
          this.formulario.get('produtos').value.push({'produto': p, 'quantidade': 0});
        });
      }
    }
  }

  adicionaProdutosLista(event, idModal) {
    this.adicionarProduto(event);
    this.closeModal(idModal);
  }

  limparProdutoTemp() {
    this.produtoTemp = null;
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

  searchByNome(value) {
    if (value.length >= 3) {
      if (this.tempo) {
        clearTimeout(this.tempo);
      }
      this.tempo = setTimeout(() => {
        this.produtoService.pesquisarTodos(value)
        .then(response => {
          this.produtosList = response;
        })
        .catch(error => this.errorHadler.handle(error));
      }, 500);
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
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
