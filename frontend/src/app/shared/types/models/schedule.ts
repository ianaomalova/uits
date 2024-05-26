import {CalendarEvent} from "angular-calendar";
import {addWeeks} from "date-fns";

const CLASS_TIME_HOUR_START_ARRAY = [8, 10, 12, 14, 16, 18, 19, 21]
const CLASS_TIME_HOUR_END_ARRAY = [10, 12, 14, 15, 17, 19, 21, 22]
const CLASS_TIME_MINUTE_START_ARRAY = [30, 20, 20, 10, 0, 0, 40, 20]
const CLASS_TIME_MINUTE_END_ARRAY = [10, 0, 0, 50, 40, 30, 10, 50]

export type CalendarEventMetaLesson = {
  id: number,
  group: string,
  cabinet: string,
  type: string,
  subgroup: string
}

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
  alternativelyPeriod: boolean

  constructor(id: number, start_date: string, end_date: string | null, alternatively_period: boolean) {
    this.id = id;
    this.startDate = start_date;
    this.endDate = end_date;
    this.alternativelyPeriod = alternatively_period;
  }

  static fromListResponse(list: any[]): ScheduleLessonDate[] {
    return list.map(elem => new ScheduleLessonDate(elem.id, elem.start_date, elem.end_date, elem.alternatively_period));
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
  classTime: ClassNumbers
  weekNumber: WeekNumbers


  constructor(id: number, name: string, group: string, type: string, subgroup: string | null, cabinet: string | null, class_time: number, week_number: number, dates: ScheduleLessonDate[]) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.type = type;
    this.subgroup = subgroup;
    this.cabinet = cabinet;
    this.dates = dates;
    this.classTime = class_time;
    this.weekNumber = week_number;
  }

  static fromListResponse(list: any[]): ScheduleLesson[] {
    return list.map(elem => new ScheduleLesson(elem.id, elem.name, elem.group, elem.type, elem.subgroup, elem.cabinet, elem.class_time, elem.week_number, ScheduleLessonDate.fromListResponse(elem.dates)));
  }

  getHourStart(): number {
    return CLASS_TIME_HOUR_START_ARRAY[this.classTime - 1]
  }

  getHourEnd(): number {
    return CLASS_TIME_HOUR_END_ARRAY[this.classTime - 1]
  }

  getMinuteStart(): number {
    return CLASS_TIME_MINUTE_START_ARRAY[this.classTime - 1]
  }

  getMinuteEnd(): number {
    return CLASS_TIME_MINUTE_END_ARRAY[this.classTime - 1]
  }
}


export class Schedule {
  lessons: ScheduleLesson[];
  id: number
  teacher: number

  constructor(id: number, teacher: number, lessons: ScheduleLesson[]) {
    this.id = id;
    this.teacher = teacher;
    this.lessons = lessons;
  }

  static fromResponse(raw_schedule: any): Schedule {
    return new Schedule(raw_schedule.id, raw_schedule.teacher, ScheduleLesson.fromListResponse(raw_schedule.lessons));
  }


  toCalendarEvents(): CalendarEvent[] {
    const now = new Date()

    const events: CalendarEvent<CalendarEventMetaLesson>[] = []

    for (const lesson of this.lessons) {
      for (const date of lesson.dates) {

        const startMonth = parseInt(date.startDate.split('.')[1])
        const startDay = parseInt(date.startDate.split('.')[0])

        if (date.endDate) {
          const endMonth = parseInt(date.endDate.split('.')[1])
          const endDay = parseInt(date.endDate.split('.')[0])

          const startPeriodDate = new Date(now.getFullYear(), startMonth - 1, startDay)
          const endPeriodDate = new Date(now.getFullYear(), endMonth - 1, endDay)
          let iterFromStart = startPeriodDate;
          // console.log("----------", lesson.name)
          // console.log("start", startPeriodDate)
          // console.log("end", endPeriodDate)
          while (iterFromStart <= endPeriodDate) {
            // console.log("iterFromStart", iterFromStart, iterFromStart.getMonth(), iterFromStart.getDate());
            const id = `${lesson.weekNumber}_${lesson.id}_${date.id}_period_${iterFromStart.getMonth()}.${iterFromStart.getDate()}`;

            events.push({
              id: id,
              title: lesson.name,
              start: new Date(now.getFullYear(), iterFromStart.getMonth(), iterFromStart.getDate(), lesson.getHourStart(), lesson.getMinuteStart(), 0),
              end: new Date(now.getFullYear(), iterFromStart.getMonth(), iterFromStart.getDate(), lesson.getHourEnd(), lesson.getMinuteEnd(), 0),
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
            id: `${lesson.weekNumber}_${lesson.classTime}_${lesson.id}_${date.id}_noperiod`,
            title: lesson.name,
            start: new Date(now.getFullYear(), startMonth - 1, startDay, lesson.getHourStart(), lesson.getMinuteStart(), 0),
            end: new Date(now.getFullYear(), startMonth - 1, startDay, lesson.getHourEnd(), lesson.getMinuteEnd(), 0),
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

    return events;
  }
}
