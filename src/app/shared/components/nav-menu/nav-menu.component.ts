import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'nav-menu',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'nav-menu.component.html'
})
export class NavMenu {
	
	@Input() mode: 'vertical' | 'horizontal' = 'vertical'
	@Input() model: string
	@Input('class') nativeClass: string
	@Input() defaultOpeneds: string[]
	@Input() uniqueOpened: boolean = false
	@Input() menuTrigger: string = 'hover'
	@Input() border: boolean = true
	@Output() modelChange: EventEmitter<any> = new EventEmitter<any>()
	
	openedMenus: string[] = this.getDefaultOpen()
	showBorderIndex: string
	
	openMenu(index: string): void {
		const openedMenus = this.openedMenus
		if (openedMenus.indexOf(index) !== -1) return
		this.openedMenus.push(index)
	}
	
	closeMenu(index: string): void {
		this.openedMenus.splice(this.openedMenus.indexOf(index), 1)
	}
	
	selectHandle(index: string, path?: string): void {
		const main: string = path || index
		this.model = main
		this.modelChange.emit(main)
	}

	getDefaultOpen() {
		return this.defaultOpeneds ? this.defaultOpeneds.slice(0) : []
	}
}