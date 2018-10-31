import { TipoService } from './../tipo.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';

import { Tipo } from '../../model/Tipo';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
console.log(idTipo)
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
        console.log('carregar tipo', response);
        this.tipo = new Tipo();
        this.tipo.tipo = response.tipo;
        this.tipo.id = response.id;
      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }

  adicionar() {
    this.tipoService.adicionar(this.tipo)
      .then(response => {
        this.toasty.success('Tipo adicionado!');
        this.configurarFormulario();
      })
      .catch(response => {
        this.errorHandler.handle(response);
      });
    // this.tipo = new Tipo();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      tipo: ['', [this.validarObrigatoriedade, this.validarTamanhoMinimo(3)]]
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
