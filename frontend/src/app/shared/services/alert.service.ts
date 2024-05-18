import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AlertComponent} from "ngx-bootstrap/alert";

enum AlertType {
  info = 'info',
  success = 'success',
  danger = 'danger',
  warning = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alerts$ = new BehaviorSubject<any[]>([]);

  add(message, type: AlertType[keyof AlertType] = AlertType.info, timeout = 5000): void {
    const alerts = this.alerts$.getValue()
    alerts.push({
      type: type,
      msg: message,
      timeout: timeout
    });
    this.alerts$.next(alerts);
  }

  onClosed(dismissedAlert: AlertComponent): void {
    const alerts = this.alerts$.getValue().filter(alert => alert !== dismissedAlert);
    this.alerts$.next(alerts);
  }

  clearAlerts(): void {
    this.alerts$.next([]);
  }
}
