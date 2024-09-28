import { Component, OnInit, Input } from '@angular/core';
import { NavMenu } from '@app/shared/types/nav-menu.interface';
import { navConfiguration } from '@app/configs/nav.config';
import { NavMenuColor } from '@app/shared/types/app-config.interface';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core'; // Импортируем ChangeDetectorRef

@Component({
    selector: 'header-navbar',
    templateUrl: './header-navbar.component.html',
    host: {
      '[class.header-navbar]': 'true',
      '[class.nav-menu-light]': 'color === "light"',
      '[class.nav-menu-dark]': 'color === "dark"'
    }
  })
  export class HeaderNavbarComponent implements OnInit {
  
    menu: NavMenu[] = [];
    @Input() color: NavMenuColor = 'light';
    isProfilePage: boolean = false; // Добавляем переменную
  
    constructor(
      private router: Router,
      private cdr: ChangeDetectorRef
    ) { }
  
    ngOnInit(): void {
      this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
          console.log('Обновляем видимость меню после изменения маршрута: ', this.router.url);
          this.updateMenuVisibility();
      });
    }
  
    updateMenuVisibility(): void {
      this.isProfilePage = this.router.url.startsWith('/profile');
      if (this.isProfilePage) {
          console.log('Корпоративный портал: скрываем меню');
          this.menu = [];
      } else {
          console.log('Обычная страница: показываем меню');
          this.menu = navConfiguration;
      }
      this.cdr.detectChanges(); // Обновляем представление
    }
  }
  