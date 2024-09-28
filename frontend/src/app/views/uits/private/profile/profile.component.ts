import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from "@app/shared/services/auth.service";
import { Permission } from "@app/shared/types/permission.enum";
import { map, Observable } from 'rxjs';
import { getUserPermissions } from "@app/shared/types/models/auth";
import { fadeIn } from "@app/shared/animations/fadeIn.animation";
import { Router } from '@angular/router';

interface PanelMenu {
  title: string,
  key: string,
  icon: string,
  access: Permission[],
  path: string // Добавляем путь
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
      access: [Permission.USERS, Permission.MODERATOR],
      path: '/corp/profile'
    },
    {
      title: 'Events',
      key: 'Календарь событий',
      icon: 'icon-calendar',
      access: [Permission.TEACHER],
      path: '/corp/calendar'
    },
    {
      title: 'Modular Journals Stats',
      key: 'Статистика модульных журналов',
      icon: 'icon-stats',
      access: [Permission.MODERATOR],
      path: '/corp/modular_journals/stats'
    },
    {
      title: 'Publications',
      key: 'Публикации',
      icon: 'icon-publications',
      access: [Permission.TEACHER],
      path: '/corp/publications'
    },
    {
      title: 'Achievements',
      key: 'Достижения',
      icon: 'icon-achievements',
      access: [Permission.TEACHER],
      path: '/corp/achievements'
    },
    {
      title: 'Modular Journals',
      key: 'Модульные журналы',
      icon: 'icon-journals',
      access: [Permission.TEACHER , Permission.MODERATOR],
      path: '/corp/modular_journals'
    },
    {
      title: 'Events',
      key: 'Календарь событий',
      icon: 'icon-calendar',
      access: [Permission.TEACHER, Permission.MODERATOR],
      path: '/corp/calendar'
    }
  ];

  currentPanel: string = 'Personal';

  constructor(public authService: AuthService, private router: Router) { // Добавлено
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
    this.currentPanel = seletedPanel;
  }

  onlyAccessible(): Observable<PanelMenu[]> {
    return this.authService.profile$.pipe(
      map(profile => {
        const userPermissions = getUserPermissions(profile);
        return this.panelMenu.filter(menu => userPermissions.some(up => menu.access.includes(up)));
      })
    );
  }

  navigateToHome(): void {
    this.router.navigate(['/home']); 
  }
}
