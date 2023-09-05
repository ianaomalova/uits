import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.logo]': 'true'
    }
})
export class LogoComponent implements OnInit {
    constructor() { }

    @Input() logoType : 'logo' | 'fold' = 'logo'
    @Input() white = false
    private _height: number | string = 70;
    
    @Input() set height(val) {
       this._height = val
    }
    
    get height(): string {
        return this._height + 'px';
    }

    ngOnInit(): void { }
    
    getLogoTypeUrl() {
        const chain = ['logo']
        const urlPrefix = '/assets/images/logo/'
        if(this.logoType === 'fold') {
            chain.push('fold')
        }
        if(this.white) {
            chain.push('white')
        }
        let logoUrl = `${urlPrefix}${chain.join('-')}.png`
        return logoUrl
    }    
}
