import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const startTimeBeforeEndTimeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const dateStartEnd = control.get('dateStartEnd')?.value;
  const startTime = control.get('startTime')?.value;
  const endTime = control.get('endTime')?.value;
  const allDay: boolean = control.get('allDay')?.value;

  if (!dateStartEnd || !startTime || !endTime || allDay) {
    return null; // Skip validation if any field is missing or allDay is enabled
  }

  const [startDate, endDate] = dateStartEnd;
  if (startDate.toDateString() === endDate.toDateString() && startTime >= endTime) {
    return { startTimeBeforeEndTime: true };
  }

  return null;
};
