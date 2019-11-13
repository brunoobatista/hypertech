import { Component, AfterViewInit } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';

import * as Prism from 'prismjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor() {

  }
  /**
   * @method ngAfterViewInit
   */
  ngAfterViewInit() {
    Prism.highlightAll();
    
  }
}
