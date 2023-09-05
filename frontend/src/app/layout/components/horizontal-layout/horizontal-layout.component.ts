import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { Store, Select } from '@ngxs/store'; 
import { Observable, Subscription } from 'rxjs';
import { AppConfig, NavMenuColor } from '@app/shared/types/app-config.interface';
import { ScreenSizeService } from '@app/shared/services/screen-size.service';
import { delay } from 'rxjs/operators';
import { SCREEN_SIZE } from '@app/shared/types/screen-size.enum';

@Component({
    selector: 'horizontal-layout',
    templateUrl: './horizontal-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.horizontal-layout]': 'true'
    },
    providers:[ScreenSizeService]
})
export class HorizontalLayoutComponent implements OnInit {
    
    @Select((state: { app: AppConfig; }) => state.app) app$: Observable<AppConfig>;

    navMenuColor: NavMenuColor;
    headerNavColor: string;
    isMobile: boolean;
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
            this.navMenuColor = app.navMenuColor
            this.headerNavColor = app.headerNavColor
            this.cdr.markForCheck()
        });
        this.getScreenWidth(window.innerWidth)
    }

    getScreenWidth(size:number) {
        this.screenSizeSvc.onResize(size)
    }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }
}
