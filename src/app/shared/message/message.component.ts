import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
  }

  temErro(): boolean {
    const erro = this.control.hasError(this.error) && (this.control.dirty  && this.control.touched);

    if (erro) {
      this.elRef.nativeElement.parentElement.classList.add('has-error');
    } else if (this.control.errors === null) {
      this.elRef.nativeElement.parentElement.classList.remove('has-error');
    }
    return erro;
  }

}
