import { Component, OnInit, Input, HostListener, Output, EventEmitter, ViewChildren, QueryList, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ChildActivationStart } from '@angular/router';

@Component({
  selector: 'app-input-produto',
  templateUrl: './input-produto.component.html',
  styleUrls: ['./input-produto.component.css']
})
export class InputProdutoComponent implements OnInit {

  pclass = 'product-selected';

  @Input() produtosInput = [];
  @Input() placeholder: string;
  @Input() label: string;

  @Output() changeInput = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  @Output() addProducts = new EventEmitter();

  @ViewChildren('productsList', { read: ElementRef }) productsSelected: QueryList<any>;

  @ViewChild('divLiveSearch', {read: ElementRef}) divLiveSearch: any;
  @ViewChild('inputName', {read: ElementRef}) inputName: any;

  constructor(
    private render2: Renderer2,
  ) {
  }

  ngOnInit() {
    
  }

  @HostListener("keyup", ["$event"])
    handleInput(event: any) {
        if (event.keyCode === 27) {
          this.close();
          return;
        }
    
        if (event.keyCode === 8 && this.inputName.nativeElement.value.length < 3) {
          this.removeChildren(this.divLiveSearch.nativeElement);
        }
        this.changeInput.emit(event.target.value);
    } 

  productSelected(event) {
    let parent = event.target.parentElement;
    parent.classList.toggle(this.pclass);
  }

  close() {
    this.closeModal.emit();
    this.removeChildren(this.divLiveSearch.nativeElement);
  }

  add() {
    const produtosEl = [];
    this.productsSelected.map(element => {
      if (element.nativeElement.classList.contains(this.pclass)) {
        produtosEl.push(parseInt(element.nativeElement.id));
      }
    });

    const produtosList = this.produtosInput.filter(p => {
      if (produtosEl.indexOf(p.id) > -1) {
        return p;
      }
    });
    this.addProducts.emit(produtosList);
  }

  removeChildren(div: any) {
    Array.from(div.children).forEach(c => {
      this.render2.removeChild(div, c);
    });
    this.produtosInput = [];
    this.inputName.nativeElement.value = '';
  }

}
