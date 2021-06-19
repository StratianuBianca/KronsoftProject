import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DayPilot, DayPilotCalendarComponent} from "daypilot-pro-angular";
import {DataService, MoveEventParams} from "./data.service";
import {CreateComponent} from "./create.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild("calendar", { static: false })
  calendar!: DayPilotCalendarComponent;
  @ViewChild("create", { static: false })
  create!: CreateComponent;

  events!: any[];

  navigatorConfig = {
    selectMode: "week",
    showMonths: 3,
    skipMonths: 3
  };

  calendarConfig = {
    startDate: DayPilot.Date.today(),
    viewType: "Week",
    eventDeleteHandling: "Update",
    onEventDeleted: (args: { e: { id: () => string; }; }) => {
      this.ds.deleteEvent(args.e.id()).subscribe(result => this.calendar.control.message("Deleted"));
    },
    onEventMoved: (args: { e: { id: () => any; }; newStart: any; newEnd: any; }) => {
      let params: MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      this.ds.moveEvent(params).subscribe(result => this.calendar.control.message("Moved"));
    },
    onEventResized: (args: { e: { id: () => any; }; newStart: any; newEnd: any; }) => {
      let params: MoveEventParams = {
        id: args.e.id(),
        newStart: args.newStart,
        newEnd: args.newEnd
      };
      this.ds.moveEvent(params).subscribe(result => this.calendar.control.message("Resized"));
    },
    onTimeRangeSelected: (args: any) => {
      this.create.show(args);
    }
  };

  constructor(private ds: DataService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);
  }

  viewChange() {
    this.ds.getEvents(this.calendar.control.visibleStart(), this.calendar.control.visibleEnd()).subscribe(result => this.events = result);

  }

  createClosed(result: any) {
    if (result) {
      this.events.push(result);
    }
    this.calendar.control.clearSelection();
  }

}
