import {
	Component, 
	ElementRef,
	OnDestroy, 
	Renderer2,
	Input, 
	Output, 
	EventEmitter,
	ChangeDetectionStrategy,
	ChangeDetectorRef
} from '@angular/core'
import { DocumentWrapper } from './dropdown.service'

type MenuAlignmentType = 'left' | 'right'

@Component({
	selector: 'dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class]': '"dropdown-menu-" + alignment + " " + dropdownMenuClass',
        '[class.dropdown-menu]': 'true',
		'[class.show]': 'visible'
    },
	providers: [
		DocumentWrapper
	]
})
export class DropdownMenu implements OnDestroy {

	container: HTMLDivElement;
	visible: boolean;
	preventDocDefault: boolean;
	target: any;
	docClickListener: any;
	documentResizeListener: any;

    @Input() appendTo: any;
    @Input() dropdownMenuClass: string = '';
    @Input() alignment: MenuAlignmentType = 'left'
	@Output() onShow: EventEmitter<any> = new EventEmitter();
    @Output() onHide: EventEmitter<any> = new EventEmitter();

	constructor(public el: ElementRef, public renderer: Renderer2, private cd: ChangeDetectorRef) {}

	toggle(event) {
		if (this.visible)
			this.hide();
		else
			this.show(event);
		this.preventDocDefault = true;
	}

	hide() {
        this.visible = false;
        this.onOverlayHide()
        this.onHide.emit({})
        this.cd.markForCheck();
	}
	
	show(event) {
        this.target = event.currentTarget;
        this.visible = true;
        this.preventDocDefault = true;
        this.bindDocClickListener();
        this.bindDocResizeListener();
        this.onShow.emit({})
        this.cd.markForCheck();
	}

	restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
	}

	unbindDocClickListener() {
        if (this.docClickListener) {
            this.docClickListener();
            this.docClickListener = null;
        }
	}
	
	unbindDocResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
	}
	
	bindDocClickListener() {
        if (!this.docClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.docClickListener = this.renderer.listen(documentTarget, 'click', () => {
                if (!this.preventDocDefault) {
                    this.hide();
                }

                this.preventDocDefault = false;
            });
        }
    }
    
    bindDocResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
	}
	
	onWindowResize() {
        this.hide();
    }
	
	onOverlayHide() {
        this.unbindDocClickListener();
        this.unbindDocResizeListener();
        this.preventDocDefault = false;
        this.target = null;
    }
	
	ngOnDestroy() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
}