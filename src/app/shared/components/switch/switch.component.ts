import {
    Component, 
    Input, 
    Output, 
    EventEmitter, 
    ElementRef, 
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewChild,
    forwardRef
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
    selector: 'switch',
    templateUrl: './switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SwitchComponent),
            multi: true
        }
    ]
})
export class SwitchComponent implements ControlValueAccessor {

    @Input() value: any;
    @Input() name: string;
    @Input() disabled: boolean;
    @Input() inputId: string;
    @Input() inline: boolean = false;
    @ViewChild('switch') el: ElementRef;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    public onModelChange: Function = () => {};
    public onModelTouched: Function = () => {};
    public checked: boolean;
    public focused: boolean;

    constructor(private cd: ChangeDetectorRef) {}

    onClick(event: Event, cb: HTMLInputElement) {
        if (!this.disabled) {
            event.preventDefault();
            this.toggle(event);
            cb.focus();
        }
    }

    onInputChange(event: Event) {
        if (!this.disabled) {
            const inputChecked = (<HTMLInputElement> event.target).checked;
            this.updateModel(event, inputChecked);
        }
    }

    toggle(event: Event) {
        this.updateModel(event, !this.checked);
    }

    updateModel(event: Event, value: boolean) {
        this.checked = value;
        this.onModelChange(this.checked);
        this.onChange.emit({
            originalEvent: event,
            checked: this.checked
        });
    }

    onFocus(event: Event) {
        this.focused = true;
    }

    onBlur(event: Event) {
        this.focused = false;
        this.onModelTouched();
    }

    writeValue(checked: any) : void {
        this.checked = checked;
        this.cd.markForCheck();
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }
    
    setDisabledState(val: boolean): void {
        this.disabled = val;
        this.cd.markForCheck();
    }
}
