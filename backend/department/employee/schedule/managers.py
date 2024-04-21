from typing import List

from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models, transaction
from department.employee.schedule.parse_schedule import parse_schedule


class ScheduleManager(models.Manager):

    def parse_from_file(self, file: InMemoryUploadedFile):
        return parse_schedule(file)

    @transaction.atomic
    def import_from_file(self, teacher_pk: int, file: InMemoryUploadedFile):
        from .models import ScheduleClassTime, ScheduleLesson, ScheduleLessonDate
        parsed_data = self.parse_from_file(file)

        if self.filter(teacher_id=teacher_pk).count() != 0:
            self.get(teacher_id=teacher_pk).delete()

        schedule = self.create(teacher_id=teacher_pk)
        days = schedule.create_days()

        all_class_times = []
        for day in days.all():
            parsed_day = parsed_data[day.week_number]
            class_nums = parsed_day.keys()
            class_times = day.class_times_for_bulk_save(class_numbers=class_nums)
            all_class_times.extend(class_times)
        ScheduleClassTime.objects.bulk_create(all_class_times)

        all_lessons_with_dates = []

        all_lessons_dates = []
        for day in days.all():
            parsed_day = parsed_data[day.week_number]
            for class_time in day.class_times.all():
                parsed_class_time = parsed_day[class_time.class_number]
                for i in range(len(parsed_class_time)):
                    parsed_part: List[dict] = parsed_class_time[i]
                    for parsed_lesson in parsed_part:
                        lesson = ScheduleLesson(
                            class_time=class_time,
                            group=parsed_lesson['lesson']['group'],
                            name=parsed_lesson['lesson']['name'],
                            type=parsed_lesson['lesson']['type'],
                            cabinet=parsed_lesson['lesson']['extra'].get('cabinet', None),
                            subgroup=parsed_lesson['lesson']['extra'].get('subgroup', None)
                        )

                        all_lessons_with_dates.append((lesson, parsed_lesson['date']))

        lessons: List[ScheduleLesson] = ScheduleLesson.objects.bulk_create(
            list(map(lambda o: o[0], all_lessons_with_dates)))


        for i in range(len(all_lessons_with_dates)):
            lesson = lessons[i]
            t = all_lessons_with_dates[i]
            dates = t[1]
            for parsed_date in dates:
                period = False
                if isinstance(parsed_date, dict):
                    period = True
                all_lessons_dates.append(
                    ScheduleLessonDate(
                        lesson=lesson,
                        start_date=parsed_date["start"] if period else parsed_date,
                        end_date=parsed_date["end"] if period else None,
                        is_period=period,
                        alternatively_period=parsed_date["alternatively"] if period else False
                    )
                )


        ScheduleLessonDate.objects.bulk_create(all_lessons_dates)
