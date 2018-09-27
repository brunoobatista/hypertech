import { TipoService } from './../tipo.service';
import { Component, OnInit } from '@angular/core';
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
  ) { }

  ngOnInit() {
  }

  adicionar() {
    this.tipoService.adicionar(this.tipo)
      .then(response => {
        console.log(response);
      })
      .catch(response => {
        console.log(response.error[0].mensagemUsuario);
      });
    this.tipo = new Tipo;
  }

}
