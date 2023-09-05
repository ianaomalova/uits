import {
	OnInit,
	Component, 
	Input, 
	ChangeDetectionStrategy
} from '@angular/core'
import { DocumentWrapper } from './dropdown.service'

type DirectionType = 'dropdown' | 'dropup' | 'dropright'

@Component({
	selector: 'dropdown',
	templateUrl: './dropdown.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class]': 'dropDirection + " " + dropdownClass',
		'[class.show]': 'showMenu'
    },
	providers: [
		DocumentWrapper
	]
})
export class Dropdown implements OnInit {
	@Input() dropDirection: DirectionType = 'dropdown'
	@Input() dropdownClass: string = ''

	constructor() { }

	ngOnInit(): void { }
}