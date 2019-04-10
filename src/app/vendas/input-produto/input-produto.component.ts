import { Component, OnInit, Input, ContentChild, TemplateRef, DoCheck } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { NgForOfContext } from '@angular/common';

@Component({
  selector: 'app-input-produto',
  templateUrl: './input-produto.component.html',
  styleUrls: ['./input-produto.component.css']
})
export class InputProdutoComponent implements OnInit {

  @Input() produtos: Produto[];

  @ContentChild(TemplateRef) produtoTemplate: TemplateRef<NgForOfContext<Produto>>;

  constructor() {

  }

  ngOnInit() {
  }

  

}
