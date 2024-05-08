import {Component, HostListener, OnInit} from '@angular/core';

interface PanelMenu {
  title: string,
  key: string,
  icon: string
}

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  isMobilePanelOpen = false;

  isMobile = false;

  panelMenu: PanelMenu[] = [
    {
      title: 'Personal',
      key: 'Аккаунт',
      icon: 'icon-user'
    },
    {
      title: 'Events',
      key: 'Календарь событий',
      icon: 'icon-calendar'
    }
  ]

  currentPanel: string = 'Personal';

  constructor() {
    if (window.innerWidth < 992)
      this.isMobile = true;
  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    if (event.target.innerWidth < 992) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnInit(): void {
  }

  onPanelChange(seletedPanel: string) {
    this.currentPanel = seletedPanel
  }
}
