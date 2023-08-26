import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store'; 
import { Observable, Subscription } from 'rxjs';
import { AppConfig } from '@app/shared/types/app-config.interface';
import { UpdateConfig } from '@app/store/app-config/app-config.action';

@Component({
    selector: 'theme-configurator',
    templateUrl: 'theme-configurator.component.html'
})

export class ThemeConfiguratorComponent implements OnInit {
    @Select((state: { app: AppConfig; }) => state.app) app$: Observable<AppConfig>;

    config: AppConfig
    subscription: Subscription
    headerNavColors: string[] = ['#ffffff', '#11a1fd', '#00c569', '#5a75f9', '#ffc833', '#f46363']
    
    constructor(private store: Store) { }

    ngOnInit() {
        this.subscription = this.app$.subscribe(app => {
            this.config = app
        });
    }

    configChange() {
        console.log('configChange', this.config);
        this.store.dispatch(new UpdateConfig(this.config));      
    }

    onColorChange(color: string) {
        this.config.headerNavColor = color
        this.configChange()
    }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }
}