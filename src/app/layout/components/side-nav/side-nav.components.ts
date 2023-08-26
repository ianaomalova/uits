import { 
    Component, 
    ChangeDetectionStrategy,
    ViewEncapsulation, 
    OnInit,
    Input
} from '@angular/core';
import { Router } from '@angular/router';
import { NavMenu } from '@app/shared/types/nav-menu.interface';
import { navConfiguration } from '@app/configs/nav.config'
import { NavMenuColor } from '@app/shared/types/app-config.interface';

@Component({
    selector: 'side-nav',
    templateUrl: './side-nav.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.side-nav]': 'true',
        '[class.nav-menu-collapse]': 'collapse',
        '[class.nav-menu-quick-expand]': 'quickExpand',
        '[class.nav-menu-light]': "color === 'light'",
        '[class.nav-menu-dark]': "color === 'dark'"
    }
})
export class SideNavComponent implements OnInit {
    constructor(private router: Router) { }

    menu : NavMenu[] = [];
    @Input() collapse: boolean;
    @Input() quickExpand: boolean;
    @Input() color: NavMenuColor = 'light';

    ngOnInit(): void {
        this.menu = navConfiguration
    }
}
