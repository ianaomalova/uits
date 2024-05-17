import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "@app/shared/services/auth.service";
import {Permission} from "@app/shared/types/permission.enum";
import {map, Observable} from 'rxjs';
import {getUserPermissions} from "@app/shared/types/models/auth";
import {fadeInOut} from "@app/shared/animations/fadeInOut.animation";
import {fadeIn} from "@app/shared/animations/fadeIn.animation";

interface PanelMenu {
  title: string,
  key: string,
  icon: string,
  access: Permission[]
}

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  animations: [fadeIn]
})

export class ProfileComponent implements OnInit {
  isMobilePanelOpen = false;

  isMobile = false;

  panelMenu: PanelMenu[] = [
    {
      title: 'Personal',
      key: 'Аккаунт',
      icon: 'icon-user',
      access: [Permission.USERS]
    },
    {
      title: 'Events',
      key: 'Календарь событий',
      icon: 'icon-calendar',
      access: [Permission.TEACHER]
    }
  ]

  currentPanel: string = 'Personal';

  constructor(public authService: AuthService) {
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

  onlyAccessible(): Observable<PanelMenu[]> {
    return this.authService.profile$.pipe(
      map(profile => {
        const userPermissions = getUserPermissions(profile);
        return this.panelMenu.filter(menu => userPermissions.some(up => menu.access.includes(up)))
      })
    )
  }
}
