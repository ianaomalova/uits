import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConfig} from "@app/configs/api.config";
import {map, Observable} from "rxjs";
import {convertKeysToSnakeCase, SnakeObjectToCamelCase} from "@app/shared/utils/SnakeToCamelCase";
import {CalendarUserEventMeta, IEvent} from "@app/views/uits/private/profile/events/events.model";
import {CalendarEvent} from "angular-calendar";
import {eachDayOfInterval, format, parseISO} from "date-fns";



@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) {
  }


  read(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(ApiConfig.events.read).pipe(
      map(events => events.map(SnakeObjectToCamelCase))
    );
  }

  create(body: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(ApiConfig.events.read, convertKeysToSnakeCase(body));
  }

  update(id: number, body: Partial<IEvent>): Observable<void> {
    return this.http.patch<void>(ApiConfig.events.write(id), convertKeysToSnakeCase(body));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(ApiConfig.events.write(id));
  }


  groupEventsByDate(events: CalendarEvent<CalendarUserEventMeta>[], locale): { day: string, events: CalendarEvent[] }[] {

    const eventsByDay: { [key: string]: CalendarEvent[] } = {};

    events.forEach(event => {
      const days = eachDayOfInterval({
        start: event.start,
        end: event.end || event.start
      });

      days.forEach(day => {
        const dayKey = day.toISOString();
        if (!eventsByDay[dayKey]) {
          eventsByDay[dayKey] = [];
        }
        eventsByDay[dayKey].push(event);
      });
    });

    return Object.keys(eventsByDay).map(day => ({
      day,
      events: eventsByDay[day]
    })).sort((a, b) => {
      const dateA = parseISO(a.day);
      const dateB = parseISO(b.day);
      return dateA.getTime() - dateB.getTime();
    }).map(obj => ({day: format(parseISO(obj.day), "dd MMMM yyyy", {locale: locale}), events: obj.events}));
  }
}
