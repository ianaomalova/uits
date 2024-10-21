import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';
import { Permission } from '@app/shared/types/permission.enum';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { getUserPermissions } from '@app/shared/types/models/auth';

interface CorporateMenu {
  title: string;
  route: string;
}

@Component({
  selector: 'corporate-portal',
  templateUrl: './corp.component.html',
  styleUrls: ['./corp.component.css'],
})
export class CorporateComponent implements OnInit {
  corporateMenu: CorporateMenu[] = [];
  isTeacher = false;
  isMobile = false; 
  isMobilePanelOpen = false; 
  currentPanel: string = 'default'; // Установите значение по умолчанию

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.profile$.pipe(
      map(profile => {
        const userPermissions = getUserPermissions(profile);
        if (userPermissions.includes(Permission.MODERATOR) || userPermissions.includes(Permission.SUPERUSER)) {
          this.corporateMenu = [
            { title: 'Профиль', route: '/corp/profile' },
            { title: 'Модульные журналы', route: '/corp/modular_journals' },
            { title: 'Статистика модульных журналов', route: '/corp/statistics' },
            { title: 'Календарь событий', route: '/corp/calendar' },
          ];
        } else if (userPermissions.includes(Permission.TEACHER)) {
          this.isTeacher = true;
          this.corporateMenu = [
            { title: 'Профиль', route: '/corp/profile' },
            { title: 'Публикации', route: '/corp/publications' },
            { title: 'Достижения', route: '/corp/achievements' },
            { title: 'Модульные журналы', route: '/corp/modular_journals' },
            { title: 'Календарь событий', route: '/corp/calendar' },
          ];
        } else {
          this.router.navigate(['/home']); // Редирект если нет доступа
        }
      })
    ).subscribe();
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  // Метод для проверки, находится ли пользователь на корпоративной странице
  isCorporateRoute(): boolean {
    return this.router.url.startsWith('/corp'); // Проверка, начинается ли URL с '/corp'
  }
}
