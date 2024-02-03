import {HostListener, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  isMobile: boolean;

  constructor() {
    this.isMobile = window.innerWidth < 992;
  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    if (event.target.innerWidth < 992) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
