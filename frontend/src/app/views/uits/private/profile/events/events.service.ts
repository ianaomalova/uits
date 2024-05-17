import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConfig} from "@app/configs/api.config";
import {Observable} from "rxjs";

interface IEvent {
  name: string
  description: string
  startedAt: string
  endedAt: string
  allDay: boolean
  assignedUsers: number[]
  user: number
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {
  }


  read(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(ApiConfig.events.read);
  }

  write(id: number, body: IEvent): Observable<void> {
    return this.http.post<void>(ApiConfig.events.write(id), body);
  }
}
