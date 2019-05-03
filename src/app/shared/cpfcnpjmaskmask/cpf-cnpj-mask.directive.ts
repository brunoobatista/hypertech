import { Directive, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CpfCnpjService } from './cpf-cnpj.service';

@Directive({
  selector: '[appCpfCnpjMask]',
  providers: [

  ]
})
export class CpfCnpjMaskDirective {

  constructor( private elementRef: ElementRef, private cpfCnpjService: CpfCnpjService) {

  }



  @HostListener('input', ['$event']) onInput(event) {
    const inputId = event.target.id;
    let value = event.target.value;
    if (value.length <= 18) {
      value = this.cpfCnpjService.convertToCpfCnpj(value);
      localStorage.setItem(inputId, value);
    }
    this.elementRef.nativeElement.value = localStorage.getItem(inputId);
  }

}
