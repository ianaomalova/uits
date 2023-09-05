import { Component, ContentChild, Host, Input, OnInit, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { AnimationTriggerMetadata, trigger, state, style, animate, transition } from '@angular/animations'
import { NavMenu } from './nav-menu.component'

const dropAnimation: AnimationTriggerMetadata = trigger(
    'dropAnimation', [
        state('*', style({
            opacity: 0,
            height: 0,
            border: 0,
            padding: 0,
            visibility: 'hidden',
        })),
        state('false', style({
            opacity: 0,
            height: 0,
            border: 0,
            padding: 0,
            visibility: 'hidden',
        })),
        state('true', style({
            opacity: 1,
            height: '*',
            border: '*',
            padding: '*',
            visibility: 'inherit',
        })),
        transition('* => *', animate(`150ms ease-out`)),
    ]
)


@Component({
	selector: 'nav-submenu',
	animations: [dropAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './nav-submenu.component.html'
})
export class NavSubmenu implements OnInit {
  
	@ContentChild('title') titleTmp: TemplateRef<any>
	
	@Input() index: string
	@Input() title: string
	@Input() defaultOpen: boolean

	timer: any
	opened: boolean = false
	active: boolean = false
	subActive: boolean = false
	disableHover: boolean = false
	
	constructor(@Host() public rootMenu: NavMenu, private cdr: ChangeDetectorRef) {
	}
	
	mouseenterHandle(): void {
		this.active = true
		if (this.disableHover) return
		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			this.rootMenu.openMenu(this.index)
			this.updateOpened()
			clearTimeout(this.timer)
		}, 150)
	}
	
	mouseleaveHandle(): void {
		this.active = false
		if (this.disableHover) return
		clearTimeout(this.timer)
		this.timer = setTimeout(() => {
			this.rootMenu.closeMenu(this.index)
			this.updateOpened()
			clearTimeout(this.timer)
		}, 150)
	}
	
	selectHandle(path: string): void {
		this.rootMenu.selectHandle(this.index, path)
		if (this.rootMenu.mode !== 'vertical') {
			this.rootMenu.closeMenu(this.index)
		}
		this.updateOpened()
	}
	
	updateOpened(): void {
		this.opened = this.rootMenu.openedMenus.indexOf(this.index) > -1
		this.cdr.markForCheck();
	}
	
	clickHandle(): void {
		if (!this.disableHover) return
		if (this.opened) {
			this.rootMenu.closeMenu(this.index)
		} else {
			this.rootMenu.openMenu(this.index)
		}
		this.updateOpened()
	}
	
	ngOnInit(): void {
		if(this.defaultOpen) {
			this.rootMenu.openMenu(this.index)
		}
		this.updateOpened()
		this.active = this.index === this.rootMenu.model
		this.disableHover = this.rootMenu.mode === 'vertical' || this.rootMenu.menuTrigger !== 'hover'
	}
  
}