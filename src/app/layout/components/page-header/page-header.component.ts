import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable } from "rxjs";
import { distinctUntilChanged, filter, map, startWith } from "rxjs/operators";

interface Breadcrumb {
    label: string;
    url: string;
}

@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    host: {
        '[class.page-header]': 'true'
    }
})
export class PageHeaderComponent implements OnInit {
    breadcrumbs$: Observable<Breadcrumb[]>;
    @Input() showTitle: boolean = true;

    constructor(private router: Router,  private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void { 
        this.breadcrumbs$ = this.router.events.pipe(
            startWith(new NavigationEnd(0, '/', '/')),
            filter(event => event instanceof NavigationEnd),distinctUntilChanged(),
            map(data => this.buildBreadCrumb(this.activatedRoute.root))
        );
    }

    private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
        let label = '', path = '/'
        if (route.routeConfig) {
            if (route.routeConfig.data && route.routeConfig.data.title) {
                label = route.routeConfig.data['title'];
            } else {
                label = route.routeConfig.path;
            }
            path += route.routeConfig.path;
        } else {
            label = 'Home';
            path += 'dashboard';
        }

        const nextUrl = path && path !== '/dashboard' ? `${url}${path}` : url;
        const breadcrumb = <Breadcrumb>{
            label: label, 
            url: nextUrl
        };

        const newBreadcrumbs = label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
        if (route.firstChild) {
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }
}
