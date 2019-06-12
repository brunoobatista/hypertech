import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LayoutService } from 'angular-admin-lte';
import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Output() modalRoot = new EventEmitter();

  public customLayout: boolean;

  constructor(
    private layoutService: LayoutService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = 'bootstrap';
  }

  ngOnInit() {
    this.layoutService.isCustomLayout.subscribe((value: boolean) => {
      this.customLayout = value;
    });
  }
}
