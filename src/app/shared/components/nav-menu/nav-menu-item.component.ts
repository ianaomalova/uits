import { Component, Input, OnInit, ElementRef, Optional, Output, EventEmitter } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { NavMenu } from './nav-menu.component'
import { NavSubmenu } from './nav-submenu.component'
import { Router } from '@angular/router'
import { RemoveNgTag } from '@app/shared/utils/RemoveNgTag'
import { IsParentTag } from '@app/shared/utils/IsParentTag'

@Component({
	selector: 'nav-menu-item',
	templateUrl: 'nav-menu-item.component.html'
})
export class NavMenuItem implements OnInit {
  
	@Input() navItemDisabled: boolean = false
	@Input() index: string
	@Input() title: string = ''
	@Input() to: string
	@Input() extras?: any = {}
	@Output() onNavItemClick: EventEmitter<any> = new EventEmitter();
	private inSubmenu: boolean = false
	
	constructor(
		@Optional() public rootMenu: NavMenu,
		@Optional() private subMenu: NavSubmenu,
		private sanitizer: DomSanitizer,
		private el: ElementRef,
		private router: Router,
	) {
	}
  
	clickHandle(): void {
		const comRef: any = this.subMenu || this.rootMenu
		comRef.selectHandle(this.index)
		const nextBorderIndex: string = (this.inSubmenu && this.subMenu) ? this.subMenu.index : this.index
		this.rootMenu.showBorderIndex = nextBorderIndex
		this.to && this.router.navigateByUrl(this.to, this.extras)
		this.onNavItemClick.emit()
	}
	
	ngOnInit(): void {
		this.inSubmenu = IsParentTag(this.el.nativeElement, 'nav-submenu')
		RemoveNgTag(this.el.nativeElement)
	}
}