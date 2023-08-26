import { Component, ContentChild, Host, Input, OnInit, TemplateRef } from '@angular/core'
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'
import { NavMenu } from './nav-menu.component'

@Component({
  selector: 'nav-menu-item-group',
  templateUrl: 'nav-menu-item-group.component.html'
})
export class NavMenuItemGroup implements OnInit {
  
  @ContentChild('title') titleTmp: TemplateRef<any>
  @Input() title: string = ''
  
  constructor(@Host() public rootMenu: NavMenu, private sanitizer: DomSanitizer) {
  }
  
  paddingStyle(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('padding-left: 20px')
  }

  ngOnInit(): void {
  }
}