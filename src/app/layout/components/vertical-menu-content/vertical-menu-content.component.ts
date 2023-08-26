import { 
    Component, 
    ChangeDetectionStrategy,
    ViewEncapsulation, 
    OnInit,
    EventEmitter,
    Output
} from '@angular/core';
import { Router } from '@angular/router';
import { NavMenu } from '@app/shared/types/nav-menu.interface';
import { navConfiguration } from '@app/configs/nav.config'

@Component({
    selector: 'vertical-menu-content',
    templateUrl: 'vertical-menu-content.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class VerticalMenuContentComponent implements OnInit {

    menu : NavMenu[] = [];
    @Output() onNavLinkClick= new EventEmitter();

    constructor(private router: Router) { 
    }

    ngOnInit(): void {
        this.menu = navConfiguration
    }

    onLinkClick (path: string) {
        this.onNavLinkClick.emit(path)
    }

    isSubNavOpen(key: string) {
        const currentRouteTree = this.getRouteTreeInfo(this.menu)
        return this.isExisted(currentRouteTree, key)
    }

    isExisted(navTree, key: string) {

        if(!navTree) {
            return navTree
        }

        if( navTree.key === key ){
            return true;
        }
        let treeNode; 
        for (let p in navTree) {
            if( navTree.hasOwnProperty(p) && typeof navTree[p] === 'object' ) {
                treeNode = this.isExisted(navTree[p], key);
                if(treeNode){
                    return treeNode;
                }
            }
        }
        return treeNode;
    }
    
    getRouteTreeInfo(nodes: NavMenu[]) {
        let result: NavMenu;
        let found: boolean
        nodes.some((o: NavMenu) => {
            let submenu: NavMenu;
            if (o.path === this.router.url) {
                found = true
                return result = o;
            }
            if (o.submenu && (submenu = this.getRouteTreeInfo(o.submenu))) {
                return result = Object.assign({}, o, { submenu });
            }
        });

        return result;
    }
}