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
