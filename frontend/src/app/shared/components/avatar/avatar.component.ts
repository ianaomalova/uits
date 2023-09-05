import { 
    Component, 
    OnInit, 
    ChangeDetectionStrategy, 
    ChangeDetectorRef, 
    Input, 
    ViewChild, 
    ElementRef 
} from '@angular/core';

type ShapeType = 'circle' | 'square' 
type SizeType = 'large' | 'default' | 'small'

@Component({
    selector: 'avatar',
    templateUrl: './avatar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.avatar]': 'true',
        '[class.avatar-lg]': `size === 'large'`,
        '[class.avatar-sm]': `size === 'small'`,
        '[class.avatar-square]': `shape === 'square'`,
        '[class.avatar-circle]': `shape === 'circle'`,
        '[class.avatar-icon]': `icon`,
        '[class.avatar-image]': `isImg `,
        '[style.width]': 'customSize',
        '[style.height]': 'customSize',
        '[style.line-height]': 'customSize',
        '[style.font-size.px]': '(isIcon && customSize) ? $any(size) / 2 : null'
    }
})

export class AvatarComponent implements OnInit {

    @Input() shape: ShapeType = 'circle';
    @Input() size: SizeType | number = 'default';
    @Input() text?: string;
    @Input() src?: string;
    @Input() alt?: string;
    @Input() icon?: string;

    isText: boolean = false;
    isImg: boolean = true;
    isIcon: boolean = false;
    textStyles = {};
    customSize: string | null = null;

    @ViewChild('textEl', { static: false }) textEl?: ElementRef;

    private el: HTMLElement = this.elementRef.nativeElement;

    constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef,) { }

    ngOnInit(): void { }

    ngOnChanges(): void {
        this.isText = !this.src && !!this.text;
        this.isIcon = !this.src && !!this.icon;
        this.isImg = !!this.src;
        this.setSizeStyle();
        this.calcStringSize();
    }

    private setSizeStyle(): void {
        if (typeof this.size === 'number') {
          	this.customSize = `${this.size}px`;
        } else {
          	this.customSize = null;
        }
        this.cdr.markForCheck();
    }

    private calcStringSize(): void {
        if (!this.isText) {
          	return;
        }
        const childrenWidth = this.textEl!.nativeElement.offsetWidth;
        const avatarWidth = this.el.getBoundingClientRect().width;
        const scale = avatarWidth - 8 < childrenWidth ? (avatarWidth - 8) / childrenWidth : 1;
        this.textStyles = {
          	transform: `scale(${scale}) translateX(-50%)`
        };
        if (this.customSize) {
			Object.assign(this.textStyles, {
				lineHeight: this.customSize
			});
        }
        this.cdr.detectChanges();
    }
}
