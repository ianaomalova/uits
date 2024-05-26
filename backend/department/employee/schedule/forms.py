from django import forms

from department.employee.schedule.models import ScheduleLessonDate


class ScheduleLessonDateForm(forms.ModelForm):
    class Meta:
        model = ScheduleLessonDate
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['start_date'].widget.attrs.update({'placeholder': 'Введите дату начала ДД.ММ'})
        self.fields['end_date'].widget.attrs.update({'placeholder': 'Введите дату окончания ДД.ММ (опционально)'})
        self.fields['alternatively_period'].label = 'Отметьте, если пары в периоде проводятся через неделю, а не каждую'
