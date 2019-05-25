import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

import { TipoPessoa } from 'src/app/model/Cliente';
import { ClienteService } from '../cliente.service';
import { isArray } from 'util';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css']
})
export class ClienteCadastroComponent implements OnInit {

  titulo: string;
  formulario: FormGroup;
  formBuilder = new FormBuilder();
  tipoPessoa = new Array();

  constructor(
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toasty: ToastyService,
    private clienteService: ClienteService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    Object.keys(TipoPessoa).map(p => {
      this.tipoPessoa.push({'key': p, 'value': TipoPessoa[p]});
    });

    const idCliente = this.activateRoute.snapshot.params['id'];

    if (idCliente) {
      this.carregarCliente(idCliente);
      this.titulo = 'Editar';
    } else {
      this.titulo = 'Novo';
    }

  }

  carregarCliente(id: number) {
    this.clienteService.buscarPorCodigo(id)
      .then(response => {
        this.formulario.patchValue(response);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  adicionar() {
    if (this.formulario.controls['id'].value === null) {
      this.adicionarCliente();
    } else {
      this.atualizarCliente();
    }
  }

  adicionarCliente() {
    this.clienteService.adicionar(this.formulario.value)
      .then(response => {
        this.toasty.success('Cliente adicionado!');
        this.router.navigate(['/clientes']);
      })
      .catch(error => this.errorHandler.handle(error));
  }

  atualizarCliente() {
    this.clienteService.adicionar(this.formulario.value)
    .then(response => {
      this.formulario.patchValue(response);
      this.toasty.success('Cliente atualizado!');
      })
      .catch(error => this.errorHandler.handle(error));
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      nome: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(3)
      ])),
      email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],

      tipoPessoa: new FormControl(null, Validators.required),
      cpfCnpj: new FormControl('', Validators.required),
    }, {validator: this.mustMatch('password', 'confirmPassword')});
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }

}
