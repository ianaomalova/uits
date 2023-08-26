import { Directive, ElementRef, Input,} from '@angular/core';

@Directive({
    selector: '[dropdownItem]',
    host: {
        'class': 'dropdown-item', 
        '[class.disabled]': 'disabled',
        '[class.active]': 'active'
    }
})
export class DropdownItem {

    private _disabled = false;
    private _active = false;

    @Input()
    set disabled(value: boolean) {
        this._disabled = <any>value === '' || value === true;
    }

    get disabled(): boolean { return this._disabled; }

    @Input()
    set active(value: boolean) {
        this._active = <any>value === '' || value === true;
    }

    get active(): boolean { return this._active; }

    constructor(public elementRef: ElementRef<HTMLElement>) {}
}
