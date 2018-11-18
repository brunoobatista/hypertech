import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { FornecedorService } from '../fornecedor.service';
import { CidadeService } from './../../cidades/cidade.service';

import { Fornecedor } from './../../model/Fornecedor';
@Component({
  selector: 'app-fornecedores-novo',
  templateUrl: './fornecedores-novo.component.html',
  styleUrls: ['./fornecedores-novo.component.css']
})
export class FornecedoresNovoComponent implements OnInit {

  titulo: string;
  formulario: FormGroup;
  formBuilder = new FormBuilder();
  cidades: any;

  fornecedor = new Fornecedor();

  constructor(
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toasty: ToastyService,
    private fornecedorService: FornecedorService,
    private cidadeService: CidadeService,
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.cidadeService.listarCidades()
      .then(response => {
        this.cidades = response;
      });
    const idFornecedor = this.activateRoute.snapshot.params['id'];
    if (idFornecedor) {
      this.carregarFornecedor(idFornecedor);
      this.titulo = 'Editar';
    } else {
      this.titulo = 'Criar';
    }
  }

  carregarFornecedor(id: number) {
    this.fornecedorService.buscarPorCodigo(id)
      .then(response => {
        this.formulario.patchValue(response);
      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }

  adicionar() {
    console.log(this.formulario.value);
    this.fornecedorService.adicionar(this.formulario.value)
      .then(response => {
        this.toasty.success('Fornecedor adicionado!');
        this.configurarFormulario();
      })
      .catch(error => this.errorHandler.handle(error));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(3)]],
      nomeFantasia: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(3)]],
      cpfOuCnpj: [null, this.validarObrigatoriedade],
      telefone: [''],
      telefone_op: [''],
      endereco: this.formBuilder.group({
        endereco: [''],
        numero: [''],
        complemento: ['']
      }),
      cidade: this.formBuilder.group({
        id: [null, [this.validarObrigatoriedade]],
        nome: ['']
      }),
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
       return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

}
