import {CalendarEvent} from "angular-calendar";
import {addWeeks} from "date-fns";

export enum WeekNumbers {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6
}

export enum ClassNumbers {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3,
  FOURTH = 4,
  FIFTH = 5,
  SIXTH = 6,
  SEVENTH = 7,
  EIGHTH = 8
}

export class ScheduleLessonDate {
  id: number
  startDate: string
  endDate: string | null
  isPeriod: boolean
  alternativelyPeriod: boolean

  constructor(id: number, start_date: string, end_date: string | null, is_period: boolean, alternatively_period: boolean) {
    this.id = id;
    this.startDate = start_date;
    this.endDate = end_date;
    this.isPeriod = is_period;
    this.alternativelyPeriod = alternatively_period;
  }

  static fromListResponse(list: any[]): ScheduleLessonDate[] {
    return list.map(elem => new ScheduleLessonDate(elem.id, elem.start_date, elem.end_date, elem.is_period, elem.alternatively_period));
  }
}

export class ScheduleLesson {
  id: number
  name: string
  group: string
  type: string
  subgroup: string | null
  cabinet: string | null
  dates: ScheduleLessonDate[]


  constructor(id: number, name: string, group: string, type: string, subgroup: string | null, cabinet: string | null, dates: ScheduleLessonDate[]) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.type = type;
    this.subgroup = subgroup;
    this.cabinet = cabinet;
    this.dates = dates;
  }

  static fromListResponse(list: any[]): ScheduleLesson[] {
    return list.map(elem => new ScheduleLesson(elem.id, elem.name, elem.group, elem.type, elem.subgroup, elem.cabinet, ScheduleLessonDate.fromListResponse(elem.dates)));
  }
}

export class ScheduleClassTime {
  id: number
  classNumber: ClassNumbers
  lessons: ScheduleLesson[]


  constructor(id: number, class_number: ClassNumbers, lessons: ScheduleLesson[]) {
    this.id = id;
    this.classNumber = class_number;
    this.lessons = lessons;
  }

  static fromListResponse(list: any[]): ScheduleClassTime[] {
    return list.map(elem => new ScheduleClassTime(elem.id, elem.class_number, ScheduleLesson.fromListResponse(elem.lessons)));
  }


  getHourStart(): number {
    const hourStartArray = [8, 10, 12, 14, 16, 18, 19, 21]
    return hourStartArray[this.classNumber - 1]
  }

  getHourEnd(): number {
    const hourEndArray = [10, 12, 14, 15, 17, 19, 21, 22]
    return hourEndArray[this.classNumber - 1]
  }

  getMinuteStart(): number {
    const minuteStartArray = [30, 20, 20, 10, 0, 0, 40, 20]
    return minuteStartArray[this.classNumber - 1]
  }

  getMinuteEnd(): number {
    const minuteEndArray = [10, 0, 0, 50, 40, 30, 10, 50]
    return minuteEndArray[this.classNumber - 1]
  }

}

export class ScheduleDay {
  id: number
  weekNumber: WeekNumbers
  classTimes: ScheduleClassTime[]


  constructor(id: number, week_number: WeekNumbers, class_times: ScheduleClassTime[]) {
    this.id = id;
    this.weekNumber = week_number;
    this.classTimes = class_times;
  }


  static fromListResponse(list: any[]): ScheduleDay[] {
    return list.map(elem => new ScheduleDay(elem.id, elem.week_number, ScheduleClassTime.fromListResponse(elem.class_times)))
  }
}

export class Schedule {
  days: ScheduleDay[]
  id: number
  teacher: number

  constructor(id: number, teacher: number, days: ScheduleDay[]) {
    this.id = id;
    this.teacher = teacher;
    this.days = days;
  }

  static fromResponse(raw_schedule: any): Schedule {
    return new Schedule(raw_schedule.id, raw_schedule.teacher, ScheduleDay.fromListResponse(raw_schedule.days));
  }


  toCalendarEvents(): CalendarEvent[] {
    const now = new Date()

    const events: CalendarEvent[] = []

    for (const day of this.days) {
      for (const classTime of day.classTimes) {
        for (const lesson of classTime.lessons) {
          for (const date of lesson.dates) {

            const startMonth = parseInt(date.startDate.split('.')[1])
            const startDay = parseInt(date.startDate.split('.')[0])

            if (date.isPeriod) {
              const endMonth = parseInt(date.endDate.split('.')[1])
              const endDay = parseInt(date.endDate.split('.')[0])

              const startPeriodDate = new Date(now.getFullYear(), startMonth - 1, startDay)
              const endPeriodDate = new Date(now.getFullYear(), endMonth - 1, endDay)
              let iterFromStart = startPeriodDate;
              console.log("----------", lesson.name)
              console.log("start", startPeriodDate)
              console.log("end", endPeriodDate)
              while (iterFromStart <= endPeriodDate) {
                console.log("iterFromStart", iterFromStart, iterFromStart.getMonth(), iterFromStart.getDate());
                const id = `${day.id}_${classTime.id}_${lesson.id}_${date.id}_period_${iterFromStart.getMonth()}.${iterFromStart.getDate()}`;

                events.push({
                  id: id,
                  title: lesson.name,
                  start: new Date(now.getFullYear(), iterFromStart.getMonth(), iterFromStart.getDate(), classTime.getHourStart(), classTime.getMinuteStart(), 0),
                  end: new Date(now.getFullYear(), iterFromStart.getMonth(), iterFromStart.getDate(), classTime.getHourEnd(), classTime.getMinuteEnd(), 0),
                  color: {
                    primary: "#11a1fd",
                    secondary: "#e8e4f5"
                  },
                  meta: {
                    id: lesson.id,
                    group: lesson.group,
                    cabinet: lesson.cabinet,
                    type: lesson.type,
                    subgroup: lesson.subgroup
                  }
                })

                iterFromStart = addWeeks(iterFromStart, (date.alternativelyPeriod) ? 2 : 1);
              }

            } else {
              events.push({
                id: `${day.id}_${classTime.id}_${lesson.id}_${date.id}`,
                title: lesson.name,
                start: new Date(now.getFullYear(), startMonth - 1, startDay, classTime.getHourStart(), classTime.getMinuteStart(), 0),
                end: new Date(now.getFullYear(), startMonth - 1, startDay, classTime.getHourEnd(), classTime.getMinuteEnd(), 0),
                meta: {
                  id: lesson.id,
                  group: lesson.group,
                  cabinet: lesson.cabinet,
                  type: lesson.type,
                  subgroup: lesson.subgroup
                }
              })
            }
          }
        }
      }
    }

    return events;
  }
}
