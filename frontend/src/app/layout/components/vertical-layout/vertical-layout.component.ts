import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { Select } from '@ngxs/store'; 
import { Observable, Subscription } from 'rxjs';
import { AppConfig, NavMenuColor } from '@app/shared/types/app-config.interface';
import { ScreenSizeService } from '@app/shared/services/screen-size.service';
import { delay } from 'rxjs/operators';
import { SCREEN_SIZE } from '@app/shared/types/screen-size.enum';

@Component({
    selector: 'vertical-layout',
    templateUrl: './vertical-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.vertical-layout]': 'true'
    },
    providers:[ScreenSizeService]
})
export class VerticalLayoutComponent implements OnInit {
    @Select((state: { app: AppConfig; }) => state.app) app$: Observable<AppConfig>;

    isCollapse: boolean;
    isMobile: boolean;
    isMobileNavOpen: boolean
    quickExpand: boolean;
    navMenuColor: NavMenuColor;
    headerNavColor: string;
    subscription: Subscription
    
    constructor(private cdr: ChangeDetectorRef, private screenSizeSvc: ScreenSizeService) {
        this.screenSizeSvc.onResize$.pipe(delay(0)).subscribe(sizes => {
            const sizeTabletAbove = sizes.includes(SCREEN_SIZE.XXL) ||  sizes.includes(SCREEN_SIZE.XL) || sizes.includes(SCREEN_SIZE.LG)
            if(sizeTabletAbove){
                this.isMobile = false
            } else {
                this.isMobile = true
            }
            this.cdr.markForCheck()
        });
    }

    @HostListener('window:resize', ['$event'])windowResize(event) {
        this.getScreenWidth(event.target.innerWidth)
    }

    ngOnInit() {
        this.subscription = this.app$.subscribe(app => {
            this.isCollapse = app.sideNavCollapse
            this.isMobileNavOpen = app.mobileNavCollapse
            this.navMenuColor = app.navMenuColor
            this.headerNavColor = app.headerNavColor
            this.cdr.markForCheck()
        });
        this.getScreenWidth(window.innerWidth)
    }

    mouseEnterExpand() {
        if(this.isCollapse) {
            this.quickExpand = true
        }
    }

    mouseLeaveCollapse() {
        if(this.isCollapse) {
            this.quickExpand = false
        }
    }

    getScreenWidth(size:number) {
        this.screenSizeSvc.onResize(size)
    }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }
}

