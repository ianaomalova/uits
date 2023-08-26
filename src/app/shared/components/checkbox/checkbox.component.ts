import { 
    Component, 
    Input, 
    Output,
    EventEmitter,
    forwardRef,
    ChangeDetectorRef,
    ViewChild,
    ElementRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

@Component({
    selector: 'checkbox',
    templateUrl: 'checkbox.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }],
    host: {
        '[class.form-check]': 'true',
        '[class.form-check-inline]': 'inline',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CheckboxComponent implements ControlValueAccessor {

    @Input() value: any;
    @Input() name: string;
    @Input() disabled: boolean;    
    @Input() single: boolean;
    @Input() inputId: string;  
    @Input() readonly: boolean;
    @Input() inline: boolean = false;
    @ViewChild('checkbox') el: ElementRef;
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    model: any;
    onModelChange: Function = () => {};
    onModelTouched: Function = () => {};
    focused: boolean = false;
    checked: boolean = false;

    constructor(private cd: ChangeDetectorRef) {}

    onClick(event,checkbox,focus:boolean) {
        event.preventDefault();
        if (this.disabled || this.readonly) {
            return;
        }
        this.checked = !this.checked;
        this.updateModel(event);
        if (focus) {
            checkbox.focus();
        }
    }
    
    updateModel(event) {
        if (!this.single) {
            if (this.checked) {
                this.addValue();
            } else {
                this.removeValue();
            }
            this.onModelChange(this.model);
        }else {
            this.onModelChange(this.checked);
        }
        this.onChange.emit({
            checked:this.checked,
            value: this.value, 
            originalEvent: event
        });
    }
    
    handleChange(event) {
        if (!this.readonly) {
            this.checked = event.target.checked;
            this.updateModel(event);
        }
    }

    isChecked(): boolean {
        if (this.single) {
            return this.model;
        } else {
            return this.model && this.model.indexOf(this.value) > -1;
        }
    }

    removeValue() {
        this.model = this.model.filter(val => val !== this.value);
    }

    addValue() {
        if (this.model) {
            this.model = [...this.model, this.value];
        } else {
            this.model = [this.value];
        }
    }
    
    onFocus() {
        this.focused = true;
    }

    onBlur() {
        this.focused = false;
        this.onModelTouched();
    }

    focus() {
        this.el.nativeElement.focus();
    }
     
    writeValue(model: any) : void {
        this.model = model;
        this.checked = this.isChecked();
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