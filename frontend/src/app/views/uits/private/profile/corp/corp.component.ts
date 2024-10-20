import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-corp',
  templateUrl: './corp.component.html',
  styleUrls: ['./corp.component.scss']
})
export class CorpComponent {
  currentUserPermission: string = '';


  corporateMenu = [
    { title: 'Профиль', route: '/corp/profile', icon: 'feather-user', access: ['teacher', 'admin'] },
    { title: 'Публикации', route: '/corp/publications', icon: 'feather-book', access: ['teacher'] },
    { title: 'Достижения', route: '/corp/achievements', icon: 'feather-award', access: ['teacher'] },
    { title: 'Модульные журналы', route: '/corp/modular_journals', icon: 'feather-edit', access: ['teacher', 'admin'] },
    { title: 'Статистика модульных журналов', route: '/corp/statistics', icon: 'feather-bar-chart', access: ['admin'] },
    { title: 'Календарь событий', route: '/corp/calendar', icon: 'feather-calendar', access: ['teacher', 'admin'] }
  ];

  constructor(private router: Router, private authService: AuthService) {
    this.currentUserPermission = this.authService.getRole();
  }


  hasAccess(menuItem: any): boolean {
    return menuItem.access.includes(this.currentUserPermission);
  }


  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
