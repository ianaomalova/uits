import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'column-panel',
    templateUrl: './column-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.column-panel]': 'true',
        '[class.border-end]': 'borderRight',
        '[class.border-start]': 'borderLeft',
        '[class.is-mobile-active]': 'isMobileActive'
    }
})
export class ColumnPanelComponent implements OnInit {

    @Input() panelWidth: number = 300
    @Input() borderRight: boolean = false
    @Input() borderLeft: boolean = false
    @Input() isMobileActive: boolean

    @HostBinding('style.max-width') maxWidth: string;
    @HostBinding('style.min-width') minWidth: string;
    @HostBinding('style.left') left: string;

    constructor() { }

    ngOnInit(): void {
        this.maxWidth = `${this.panelWidth}px`
        this.minWidth = `${this.panelWidth}px`
        this.left = `-${this.panelWidth}px`
    }
}
