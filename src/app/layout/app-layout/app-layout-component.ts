import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Select } from '@ngxs/store';
import { AppConfig, LayoutType } from '@app/shared/types/app-config.interface';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-layout',
    templateUrl: './app-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.layout]': 'true'
    }
})
export class AppLayoutComponent implements OnInit {

    @Select((state: { app: AppConfig; }) => state.app) app$: Observable<AppConfig>;
    
    layout: LayoutType;
    subscription: Subscription;

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.subscription = this.app$.subscribe(app => {
            this.layout = app.layoutType
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }
}
