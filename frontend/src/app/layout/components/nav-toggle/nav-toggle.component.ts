import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { Store, Select } from '@ngxs/store'; 
import { Observable } from 'rxjs';
import { AppConfig } from '@app/shared/types/app-config.interface';
import { UpdateSideNavCollapse, UpdateMobileNavCollapse } from '@app/store/app-config/app-config.action'

@Component({
    selector: 'nav-toggle',
    templateUrl: './nav-toggle.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.header-nav-item]': 'true'
    }
})
export class NavToggleComponent implements OnInit {
    @Select((state: { app: AppConfig; }) => state.app) app$: Observable<AppConfig>;

    private isCollapse: boolean
    private isMobileCollapse: boolean
    @Input() isMobile: boolean

    constructor(private store: Store, private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.app$.subscribe(app => {
            this.isCollapse = app.sideNavCollapse
            this.isMobileCollapse = app.mobileNavCollapse
            this.cdr.markForCheck()
        });
    }
    
    updateSideNavCollapse() {
        this.store.dispatch(new UpdateSideNavCollapse(this.isCollapse));
    }

    toggleNavCollapse() {
        if(!this.isMobile) {
            this.isCollapse = !this.isCollapse;
            this.store.dispatch(new UpdateSideNavCollapse(this.isCollapse));
        } else {
            this.isMobileCollapse = !this.isMobileCollapse
            this.store.dispatch(new UpdateMobileNavCollapse(this.isMobileCollapse));
        }
    }
}
