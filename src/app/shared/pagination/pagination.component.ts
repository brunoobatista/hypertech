import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  lastPageLocal: number;
  startPageLocal: number;
  endPageLocal: number;
  currentPageLocal: number;
  pages = [];

  totalPagesGeral: number;

  @Input()  totalPages: number;
  totalPagesLocal: number;
  @Input()  pageCurrent: number;
  pageCurrentLocal: number;
  @Input()  totalElements: number;
  totalElementsLocal: number;
  @Input()  rows: number;
  rowsLocal: number;

  @Output() page = new EventEmitter();

  changeLog: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes) {
        const value = changes[propName];
        if (propName === 'totalPages') {
          this.totalPagesLocal = value.currentValue - 1;
        } else if (propName === 'pageCurrent') {
          this.pageCurrentLocal = value.currentValue;
        } else if (propName === 'totalElements') {
          this.totalElementsLocal = value.currentValue;
        } else if (propName === 'rows') {
          this.rowsLocal = value.currentValue;
        }

      }
    }

    this.pages = this.generatePagination(this.totalPagesLocal, this.pageCurrentLocal, this.totalElementsLocal, this.rowsLocal);
  }

  changePage(pageNumber: number) {
    this.page.emit(pageNumber);
  }

  generatePagination(totalPages, pageCurrent, totalElements, rows) {
      let startPage = (pageCurrent < 3) ? 0 : pageCurrent - 2;
      let endPage = 4 + startPage;
      endPage = (totalPages < endPage) ? totalPages : endPage;
      const diff = startPage - endPage + 4;
      startPage -= (startPage - diff > 0) ? diff : 0;
      const array = [];

      for (let i = startPage ; i <= endPage; i++) {
        array.push(i);
      }

      this.totalPagesGeral = totalPages;
      this.lastPageLocal = Math.ceil(totalElements / rows);
      this.startPageLocal = startPage;
      this.endPageLocal = endPage;
      this.currentPageLocal = pageCurrent;

      return array;
  }

}
