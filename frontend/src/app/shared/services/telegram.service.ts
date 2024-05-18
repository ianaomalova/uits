import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiConfig} from "@app/configs/api.config";

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  constructor(private http: HttpClient) { }



  userEventNotify(userEventId: number): Observable<void> {
    return this.http.post<void>(ApiConfig.telegram.events.notify, {id: userEventId});
  }
}
