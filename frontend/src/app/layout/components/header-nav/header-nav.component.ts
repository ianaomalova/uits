import { 
    Component, 
    ChangeDetectionStrategy,
    ViewEncapsulation, 
    OnInit,
    Input,
    HostBinding
} from '@angular/core';
import { LayoutType } from '@app/shared/types/app-config.interface';
import { ColorContrast } from '@app/shared/utils/ColorContrast';

@Component({
    selector: 'header-nav',
    templateUrl: './header-nav.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.header-nav]': 'true',
        '[class.layout-vertical]': 'layoutType === "vertical"',
        '[class.layout-horizon]': 'layoutType === "horizontal"',
        '[class.is-collapse]': 'collapse'
    }
})
export class HeaderNavComponent implements OnInit {

    @Input() layoutType: LayoutType
    @Input() collapse: boolean
    @Input() isMobile: boolean
    @Input()@HostBinding('style.background-color') color: string = '#ffffff'

    logoColor: 'light' | 'dark'

    @HostBinding('class') get headingClass() {
        const color = ColorContrast(this.color)
        this.logoColor = color
        return `header-text-${color}`
    }


    constructor() { }

    ngOnInit(): void { 
    }
}

