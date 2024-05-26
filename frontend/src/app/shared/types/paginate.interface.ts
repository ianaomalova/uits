import {BehaviorSubject} from "rxjs";

export interface onPaginate {
  page: number
}

export interface OnLimitOffsetPaginate<T> extends onPaginate {
  limit: number;
  offset: number;
  paginatedResponse$: BehaviorSubject<Pagination<T>>
}

export type Pagination<T extends any> = {
  count: number
  next: string
  previous: string
  results: T[]
}
