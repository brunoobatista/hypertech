import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { TipoService } from './../tipo.service';

import { Tipo } from '../../model/Tipo';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tipo-novo',
  templateUrl: './tipo-novo.component.html',
  styleUrls: ['./tipo-novo.component.css']
})
export class TipoNovoComponent implements OnInit {

  tipo = new Tipo;
  formulario: FormGroup;
  formBuilder = new FormBuilder();
  titulo: string;

  constructor(
    private tipoService: TipoService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toasty: ToastyService,
  ) {

  }

  ngOnInit() {
    this.configurarFormulario();
    const idTipo = this.activateRoute.snapshot.params['id'];
    if (idTipo) {
      this.carregarTipo(idTipo);
      this.titulo = 'Editar';
    } else {
      this.titulo = 'Criar';
    }

  }

  carregarTipo(id: number) {
    this.tipoService.buscarPorCodigo(id)
      .then(response => {
        this.tipo = new Tipo();
        this.tipo.tipo = response.tipo;
        this.tipo.id = response.id;
      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }


  adicionar() {
    if (this.formulario.value.id === null) {
      this.adicionarTipo();
    } else {
      this.atualizarTipo();
    }
  }

  adicionarTipo() {
    this.tipoService.adicionar(this.formulario.value)
      .then(response => {
        this.toasty.success('Tipo adicionado!');
        this.router.navigate(['/fornecedores']);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  atualizarTipo() {
    this.tipoService.adicionar(this.formulario.value)
      .then(response => {
        this.formulario.patchValue(response);
        this.toasty.success('Tipo atualizado!');
        this.router.navigate(['/fornecedores', response.id]);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: ['', [this.validarObrigatoriedade, this.validarTamanhoMinimo(3)]]
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
