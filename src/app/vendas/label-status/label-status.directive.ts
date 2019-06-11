import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { StatusVenda } from 'src/app/model/Venda';
import { NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appLabelStatus]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: LabelStatusDirective, multi: true }
]
})
export class LabelStatusDirective {

  @Input() lbStatus: any;
  @Input() lbClass: any = 'label';
  @Input() lbClassExtra = '';
  constructor(private templateRef: ElementRef) { }

  @HostBinding('class')
  get labelClass() {
    if (this.lbStatus === 'ABERTA') {
      return `${this.lbClass} ${this.lbClass}-success ${this.lbClassExtra}`;
    } else if (this.lbStatus === 'FINALIZADA') {
      return `${this.lbClass} ${this.lbClass}-info ${this.lbClassExtra}`;
    } else if (this.lbStatus === 'CANCELADA') {
      return `${this.lbClass} ${this.lbClass}-danger ${this.lbClassExtra}`;
    } else if (this.lbStatus === 'ESTORNADA') {
      return `${this.lbClass} ${this.lbClass}-warning ${this.lbClassExtra}`;
    } else {
      return `${this.lbClass} ${this.lbClass}-default ${this.lbClassExtra}`;
    }
  }

}
