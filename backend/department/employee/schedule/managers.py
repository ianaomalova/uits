from typing import List

from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models, transaction
from department.employee.schedule.parse_schedule import parse_schedule


def validate_before_bulk_create(data):
    errors = []
    for item in data:
        try:
            item.full_clean()  # This will run all field and model validators
        except ValidationError as e:
            errors.append((item, e))
    if errors:
        raise ValidationError(errors)


class ScheduleManager(models.Manager):

    def parse_from_file(self, file: InMemoryUploadedFile):
        return parse_schedule(file)

    @transaction.atomic
    def import_from_file(self, teacher_pk: int, file: InMemoryUploadedFile):
        from .models import ScheduleLesson, ScheduleLessonDate
        parsed_data = self.parse_from_file(file)

        if self.filter(teacher_id=teacher_pk).count() != 0:
            self.get(teacher_id=teacher_pk).delete()

        schedule = self.create(teacher_id=teacher_pk, imported_file_name=file.name[:255])

        all_lessons_with_dates = []

        for week_number in parsed_data.keys():
            class_times = parsed_data[week_number]
            for class_time in class_times.keys():
                parts = class_times[class_time]
                for lessons in parts:
                    for parsed_lesson in lessons:
                        lesson = ScheduleLesson(
                            class_time=class_time,
                            week_number=week_number,
                            group=parsed_lesson['lesson']['group'],
                            name=parsed_lesson['lesson']['name'],
                            type=parsed_lesson['lesson']['type'],
                            cabinet=parsed_lesson['lesson']['extra'].get('cabinet', None),
                            subgroup=parsed_lesson['lesson']['extra'].get('subgroup', None),
                            schedule=schedule
                        )
                        all_lessons_with_dates.append((lesson, parsed_lesson['date']))

        all_lessons_dates = []
        only_lessons = list(map(lambda o: o[0], all_lessons_with_dates))

        validate_before_bulk_create(only_lessons)
        lessons: List[ScheduleLesson] = ScheduleLesson.objects.bulk_create(only_lessons)

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
                        alternatively_period=parsed_date["alternatively"] if period else False
                    )
                )
        validate_before_bulk_create(all_lessons_dates)
        ScheduleLessonDate.objects.bulk_create(all_lessons_dates)
