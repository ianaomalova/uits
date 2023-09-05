import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dropdown } from './dropdown.component';
import { DropdownMenu } from './dropdown-menu.component';
import { DropdownItem } from './dropdown-item.directive';

@NgModule({
    declarations: [
        Dropdown,
        DropdownMenu,
        DropdownItem
    ],
    imports: [ 
        CommonModule 
    ],
    exports: [
        Dropdown,
        DropdownMenu,
        DropdownItem
    ]
})
export class DropdownModule {}