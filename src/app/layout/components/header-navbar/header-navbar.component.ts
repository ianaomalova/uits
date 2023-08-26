import { Component, OnInit, Input } from '@angular/core';
import { NavMenu } from '@app/shared/types/nav-menu.interface';
import { navConfiguration } from '@app/configs/nav.config'
import { NavMenuColor } from '@app/shared/types/app-config.interface';

@Component({
    selector: 'header-navbar',
    templateUrl: './header-navbar.component.html',
    host: {
        '[class.header-navbar]': 'true',
        '[class.nav-menu-light]': "color === 'light'",
        '[class.nav-menu-dark]': "color === 'dark'"
    }
})
export class HeaderNavbarComponent implements OnInit {

    menu : NavMenu[] = []
    @Input() color: NavMenuColor = 'light';

    constructor() { }

    ngOnInit(): void {
        this.menu = navConfiguration
    }
}
