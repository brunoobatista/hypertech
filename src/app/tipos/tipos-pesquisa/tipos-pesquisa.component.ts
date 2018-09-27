import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TipoService } from '../tipo.service';

@Component({
  selector: 'app-tipos-pesquisa',
  templateUrl: './tipos-pesquisa.component.html',
  styleUrls: ['./tipos-pesquisa.component.css']
})
export class TiposPesquisaComponent implements OnInit {

  tipos = [];

  constructor(
    private tipoService: TipoService,
    private cdRef: ChangeDetectorRef
    ) {

  }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.tipoService.pesquisar()
      .then(response => {
        this.tipos = response;
      });
  }

}
