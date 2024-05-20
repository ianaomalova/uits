import {Profile} from "@app/shared/types/models/auth";
import {FormControl} from "@angular/forms";

export interface IEvent {
  id?: number
  name: string
  description: string
  startedAt: string
  endedAt: string
  color: string
  allDay: boolean
  assignedUsers: number[]
  user: number
}

export interface EditEventFormGroup {
  id: FormControl<any>
  title: FormControl<string>
  dateStartEnd: FormControl<Date[]>
  startTime: FormControl<Date>,
  endTime: FormControl<Date>,
  allDay: FormControl<boolean>
  color: FormControl<string>
  assignedUsers: FormControl<any>
  assignedUsersSelectAll: FormControl<boolean>
  description: FormControl<string>
}


export interface CalendarUserEventMeta {
  description?: string,
  assigned?: ({ pk: number, username: string, firstName: string, lastName: string } | Profile)[],
  owner?: number
}
