import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavMenu } from './nav-menu.component';
import { NavSubmenu } from './nav-submenu.component'
import { NavMenuItem } from './nav-menu-item.component' 
import { NavMenuItemGroup } from './nav-menu-item-group.component'

@NgModule({
    declarations: [
        NavMenu,
        NavSubmenu,
        NavMenuItem,
        NavMenuItemGroup
    ],
    imports: [ 
        CommonModule 
    ],
    exports: [
        NavMenu,
        NavSubmenu,
        NavMenuItem,
        NavMenuItemGroup
    ],
    providers: [],
})
export class NavMenuModule {}