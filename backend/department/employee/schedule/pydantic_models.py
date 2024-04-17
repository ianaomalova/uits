from enum import IntEnum
from typing import List, Optional

from pydantic import BaseModel


class LessonTimes(IntEnum):
    FIRST = 1
    SECOND = 2
    THIRD = 3
    FOURTH = 4
    FIFTH = 5
    SIXTH = 6
    SEVENTH = 7
    EIGHTH = 8

    @staticmethod
    def from_name(name: str) -> 'LessonTimes':
        name = name.lower()
        match name:
            case '8:30 - 10:10':
                return LessonTimes.FIRST
            case '10:20 - 12:00':
                return LessonTimes.SECOND
            case '12:20 - 14:00':
                return LessonTimes.THIRD
            case '14:10 - 15:50':
                return LessonTimes.FOURTH
            case '16:00 - 17:40':
                return LessonTimes.FIFTH
            case '18:00 - 19:30':
                return LessonTimes.SIXTH
            case '19:40 - 21:10':
                return LessonTimes.SEVENTH
            case '21:20 - 22:50':
                return LessonTimes.EIGHTH


class LessonWeekNumbers(IntEnum):
    MONDAY = 1
    TUESDAY = 2
    WEDNESDAY = 3
    THURSDAY = 4
    FRIDAY = 5
    SATURDAY = 6

    @staticmethod
    def from_name(name: str) -> 'LessonWeekNumbers':
        name = name.lower()
        match name:
            case 'понедельник':
                return LessonWeekNumbers.MONDAY
            case 'вторник':
                return LessonWeekNumbers.TUESDAY
            case 'среда':
                return LessonWeekNumbers.WEDNESDAY
            case 'четверг':
                return LessonWeekNumbers.THURSDAY
            case 'пятница':
                return LessonWeekNumbers.FRIDAY
            case 'суббота':
                return LessonWeekNumbers.SATURDAY


class ScheduleLessonInfoExtra(BaseModel):
    cabinet: Optional[str]
    subgroup: Optional[str]


class ScheduleLessonInfo(BaseModel):
    group: str
    name: str
    type: str
    extra: ScheduleLessonInfoExtra


class ScheduleLessonDatePeriod(BaseModel):
    start: str
    end: str
    alternatively: bool  # если true - то через неделю, если False - то каждую неделю


class ScheduleLessons(BaseModel):
    lesson: ScheduleLessonInfo
    date: List[ScheduleLessonDatePeriod | str]


class ScheduleTimePart(BaseModel):
    lessons: List[ScheduleLessons]


class ScheduleTime(BaseModel):
    type: LessonTimes
    parts: List[ScheduleTimePart]


class ScheduleDay(BaseModel):
    type: LessonWeekNumbers
    times: List[ScheduleTime]


class Schedule(BaseModel):
    teacher_id: int
    days: List[ScheduleDay]
