import {endOfDay, startOfDay} from "date-fns";

export const DEFAULT_EVENT_COLOR = '#11a1fd'
export const getDefaultDateStartEnd = () => [startOfDay(new Date()), endOfDay(new Date())]
export const getDefaultStartTime = () => startOfDay(new Date());
export const getDefaultEndTime = () => endOfDay(new Date());
