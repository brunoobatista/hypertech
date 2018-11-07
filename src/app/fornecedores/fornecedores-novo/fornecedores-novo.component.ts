import { Fornecedor } from './../../model/Fornecedor';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-fornecedores-novo',
  templateUrl: './fornecedores-novo.component.html',
  styleUrls: ['./fornecedores-novo.component.css']
})
export class FornecedoresNovoComponent implements OnInit {

  titulo: string;
  formulario: FormGroup;
  formBuilder = new FormBuilder();

  constructor(
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toasty: ToastyService,
  ) { }

  ngOnInit() {
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: ['', [this.validarObrigatoriedade, this.validarTamanhoMinimo(3)]],
      nome_fantasia: ['', [this.validarObrigatoriedade, this.validarTamanhoMinimo(3)]],
      cpf_cnpj: ['', this.validarObrigatoriedade],
      telefone: [''],
      telefone_op: [''],

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
