import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from './pagination/pagination.component';
import { MessageComponent } from './message/message.component';
import { ModalComponent } from './modal.component';

import { CurrencyMaskDirective } from '../currency-mask/currency-mask.directive';

import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "../currency-mask/currency-mask.config";

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: false,
    decimal: ",",
    precision: 2,
    prefix: "",
    suffix: "",
    thousands: ".",
    type: ''
};

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaginationComponent, MessageComponent, ModalComponent, CurrencyMaskDirective],
  exports: [PaginationComponent, MessageComponent, ModalComponent, CurrencyMaskDirective],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ],
})
export class SharedModule { }
