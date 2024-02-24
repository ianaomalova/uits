import { Pipe, PipeTransform } from '@angular/core';
import {formatDistance, parseISO} from "date-fns";
import {ru} from "date-fns/locale";

@Pipe({
  name: 'timeFromDate'
})
export class TimeFromDatePipe implements PipeTransform {

  transform(value: string): string {
    const date = parseISO(value);
    const now = new Date();
    const diffDays = Math.ceil((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
      // Если разница больше 7 дней, возвращаем полную дату d MMMM yyyy
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } else {
      // Иначе возвращаем разницу в днях/часах/минутах
      return formatDistance(date, now, { addSuffix: true, locale: ru });
    }
  }

}
