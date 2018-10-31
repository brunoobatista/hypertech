import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { MessageComponent } from './message/message.component';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PaginationComponent, MessageComponent, ModalComponent],
  exports: [PaginationComponent, MessageComponent, ModalComponent],
})
export class SharedModule { }
