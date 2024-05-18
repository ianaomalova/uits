import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {LayoutType} from '@app/shared/types/app-config.interface';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, startWith} from 'rxjs/operators';
import {AlertService} from "@app/shared/services/alert.service";
import {fadeInOut} from "@app/shared/animations/fadeInOut.animation";

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.content]': 'true',
    '[class.container]': 'layoutType === "horizontal"',
    '[class.with-page-header]': 'pageHeader',
    '[class.is-collapse]': 'collapse'
  },
  animations: [fadeInOut]
})
export class ContentComponent implements OnInit {

  @Input() collapse: boolean;
  @Input() layoutType: LayoutType;
  @Input() pageHeader = true;

  hideAlerts = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public alertService: AlertService) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(this.router),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data.hidePageHeader) {
            return child.snapshot.data.hidePageHeader;
          } else {
            return null;
          }
          if (child.snapshot.data && child.snapshot.data['hideAlerts']) {
            this.hideAlerts = child.snapshot.data['hideAlerts']
          }
        }
        return null;
      })
    )
      .subscribe((data: NavigationEnd) => {
        data ? this.pageHeader = false : this.pageHeader = true;
      });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideAlerts = this.getCurrentRouteHideAlerts(this.activatedRoute.root);
        if (this.hideAlerts) {
          this.clearAlerts(); // Очищаем список алертов при скрытых алертах
        }
      }
    });
  }

  private getCurrentRouteHideAlerts(route: ActivatedRoute): boolean {
    let child = route.firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data && child.snapshot.data['hideAlerts'] !== undefined) {
        return child.snapshot.data['hideAlerts'];
      } else {
        return false; // По умолчанию скрываем алерты
      }
    }
    return false; // По умолчанию скрываем алерты
  }

  private clearAlerts() {
    this.alertService.clearAlerts();
  }
}
