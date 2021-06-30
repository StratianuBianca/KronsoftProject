
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
  } from 'angular-calendar';
export class CalendarModel {
    title:any;
    start:any;
    end:any;


    constructor(start: any,end:any, title: any) {
      this.start = start;
      this.end=end;
      this.title = title;
    }
  
  }