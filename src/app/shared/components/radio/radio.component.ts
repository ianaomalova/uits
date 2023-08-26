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
    selector: 'radio',
    templateUrl: './radio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioComponent),
        multi: true,
    }]
})
export class RadioComponent implements ControlValueAccessor {
   
    @Input() value: any;
    @Input() name: string;
    @Input() disabled: boolean;
    @Input() inputId: string;
    @Input() inline: boolean = false;
    @ViewChild('radio') el: ElementRef;
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    @Output() onFocus: EventEmitter<any> = new EventEmitter();
    @Output() onBlur: EventEmitter<any> = new EventEmitter();
    public onModelChange: Function = () => {};
    public onModelTouched: Function = () => {};
    public checked: boolean;
    public focused: boolean;

    constructor(public cd: ChangeDetectorRef) {}
    
    handleClick(event, radioButton, focus) {
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        this.select(event);
        if (focus) {
            radioButton.focus();
        }
    }
    
    select(event) {
        if (!this.disabled) {
            this.el.nativeElement.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
            this.onClick.emit(event);
        }
    }
            
    writeValue(value: any) : void {
        this.checked = (value == this.value);
        if (this.el && this.el.nativeElement) {
            this.el.nativeElement.checked = this.checked;
        }
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
    
    onInputFocus(event) {
        this.focused = true;
        this.onFocus.emit(event);
    }

    onInputBlur(event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    
    onChange(event) {
        this.select(event);
    }

    focus() {
        this.el.nativeElement.focus();
    }
}