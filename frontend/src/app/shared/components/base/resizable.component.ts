import {Component, HostListener} from '@angular/core';

@Component({
    template: ''
})
export class ResizableComponent {
  isMobile: boolean;

  constructor() {
    this.checkIsMobile();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event?) {
    this.checkIsMobile();
  }

  private checkIsMobile() {
    this.isMobile = window.innerWidth < 992;
  }
}
