import { Component, Input, AfterContentInit } from '@angular/core';
declare const PR: any;
@Component({
  selector: 'ng-sample-box',
  templateUrl: './sample-box.component.html'
})
export class SampleBoxComponent implements AfterContentInit {
  @Input() ts: string;
  @Input() html: string;
  @Input() spec: string;
  @Input() style: string;
  @Input() svc: string;

  ngAfterContentInit(): any {
    if (typeof PR !== 'undefined') {
        PR.prettyPrint();
    }
  }  
}
