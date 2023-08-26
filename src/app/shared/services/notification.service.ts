import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '@app/configs/app.config';

import Notification from '../types/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationUrl = `${API_ENDPOINT}/notification`;

  constructor(private http: HttpClient) {}

  public getNotificationList() {
    return this.http.get<Array<Notification>>(this.notificationUrl);
  }
}