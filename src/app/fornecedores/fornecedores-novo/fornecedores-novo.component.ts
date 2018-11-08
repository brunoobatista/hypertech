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
    this.cidades = this.cidadeService.listarCidades();
  }

  adicionar() {
    this.fornecedorService.adicionar(this.formulario.value)
      .then(response => {
        console.log(response);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: ['', [this.validarObrigatoriedade, this.validarTamanhoMinimo(3)]],
      nome_fantasia: ['', [this.validarObrigatoriedade, this.validarTamanhoMinimo(3)]],
      cpfOuCnpj: ['', this.validarObrigatoriedade],
      telefone: [''],
      telefone_op: [''],
      endereco: this.formBuilder.group({
        endereco: [''],
        numero: [''],
        complemento: ['']
      }),
      cidade: this.formBuilder.group({
        id: [1, [this.validarObrigatoriedade]],
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
