import { TipoService } from './../tipo.service';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../../core/error-handler.service';

import { Tipo } from '../../model/Tipo';

@Component({
  selector: 'app-tipo-novo',
  templateUrl: './tipo-novo.component.html',
  styleUrls: ['./tipo-novo.component.css']
})
export class TipoNovoComponent implements OnInit {

  tipo = new Tipo;

  constructor(
    private tipoService: TipoService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  adicionar() {
    this.tipoService.adicionar(this.tipo)
      .then(response => {
        console.log(response);
      })
      .catch(response => {
        this.errorHandler.handle(response);
      });
    this.tipo = new Tipo;
  }

}
