import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { LayoutType } from '@app/shared/types/app-config.interface';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, startWith} from "rxjs/operators";

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.content]': 'true',
        '[class.container]': 'layoutType === "horizontal"',
        '[class.with-page-header]': 'pageHeader',
        '[class.is-collapse]': 'collapse'
    }
})
export class ContentComponent implements OnInit {

    @Input() collapse: boolean
    @Input() layoutType: LayoutType
    @Input() pageHeader: boolean = true

    constructor(private router: Router,  private activatedRoute: ActivatedRoute) {
        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            startWith(this.router),
            map(() => {
                let child = this.activatedRoute.firstChild;
                while (child) {
                    if (child.firstChild) {
                        child = child.firstChild;
                    } else if (child.snapshot.data && child.snapshot.data['hidePageHeader']) {
                        return child.snapshot.data['hidePageHeader'];
                    } else {
                        return null;
                    }
                }
                return null;
            })
        )
        .subscribe((data: NavigationEnd) => {
            data ? this.pageHeader = false : this.pageHeader = true
        })
    }

    ngOnInit(): void { 
    }
}
