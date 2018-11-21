import { TipoService } from './../../tipos/tipo.service';
import { FornecedorService } from './../../fornecedores/fornecedor.service';
import { ProdutoService } from './../produto.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Tipo } from './../../model/Tipo';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Fornecedor } from 'src/app/model/Fornecedor';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {

  titulo: string;
  formulario: FormGroup;
  formBuilder = new FormBuilder();
  tipos: Array<Tipo>;
  fornecedores: Array<Fornecedor>;

  constructor(
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toasty: ToastyService,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService,
    private tipoService: TipoService
  ) { }

  ngOnInit() {
  }

  validarObrigatoriedade(input: FormControl) {
    return input.value ? null : {obrigatoriedade: true};
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
    };
  }

}