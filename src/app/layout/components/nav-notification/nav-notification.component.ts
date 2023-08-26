import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TimeSince } from '@app/shared/utils/TimeSince'

@Component({
    selector: 'nav-notification',
    templateUrl: './nav-notification.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.header-nav-item]': 'true'
    }
})
export class NavNotificationComponent implements OnInit {

    notificationList = [];
    notificationIconMap = {
        0: '',
        1: 'feather icon-info',
        2: 'feather icon-check-circle',
        3: 'feather icon-x-circle'
    }

    notificationColorMap = {
        0: '',
        1: 'bg-primary',
        2: 'bg-success',
        3: 'bg-danger'
    }

    constructor() {
        this.loadData();
    }
    
    loadData() {
        console.log('Load Data');
    }

    getTimeDistance(time: number) {
        return TimeSince(time)
    }

    ngOnInit(): void {
    }
}
