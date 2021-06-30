import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {ChangeDetectionStrategy,ViewChild,TemplateRef,} from '@angular/core';
import {
  startOfDay, endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AppointmentService} from "../../service/appointments.service";
import { AppointmentModel } from 'src/app/models/appointment.model';
import { th } from 'date-fns/locale';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { CalendarModel } from "../../models/calendar.model";
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-patient-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-calendar.component.html',
  styleUrls: ['./patient-calendar.component.css']
})

export class PatientCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true })
  modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;
  subscriptionList: Subscription[] = [];
  app: AppointmentModel[] = [];
  CalendarView = CalendarView;
  modelsCalendar!: CalendarModel;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  evem: CalendarEvent[] = [
    {
    start: subDays(startOfDay(new Date())
    , 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: colors.red,
    actions: this.actions,
    allDay: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    draggable: true,}
  ];

  events: CalendarEvent[] = [
   /* {
      start: subDays(startOfDay(new Date())
      , 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: subDays(startOfDay(new Date()), 0),
      end: addDays(new Date(), 5),
      title: 'A 4 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },*/
  ];

  activeDayIsOpen: boolean = true;

  refresh: Subject<any> = new Subject();

  constructor(private modal: NgbModal, private router: Router,public  service: AppointmentService) { }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.router.navigate([`appointments/add`]);
  }

  deleteEvent(id:number) {
    this.service.deleteAppointment(id).subscribe(() => this.app = this.app.filter((item) => item.appointmentId != id))
  }

  setView(view: CalendarView) {   
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  ngOnInit(): void {
    const words=this.router.url.split('/');
    this.subscriptionList.push(this.service.getAppointmentById(parseInt(words[3])).subscribe(list=>this.app=list));
    console.log(this.app.length);
   /* for(let ev of this.app){
      console.log(ev.startTime);
      console.log("SDs");
      this.modelsCalendar.start=ev.startTime;
      this.modelsCalendar.end=ev.endTime;
      this.modelsCalendar.draggable=true;
      this.modelsCalendar.actions=this.actions;
      this.modelsCalendar.allDay=true;
      this.modelsCalendar.resizable.afterEnd=true;
      this.modelsCalendar.resizable.beforeStart=true;
      this.events.push(this.modelsCalendar);
      
    }
    console.log(this.subscriptionList);
    console.log(this.events);*/
  }


}
