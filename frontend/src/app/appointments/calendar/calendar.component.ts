import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular'
import { Data, Router } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointments.service';
import { Subscription } from 'rxjs';
import { AppointmentModel } from 'src/app/models/appointment.model';
import { CalendarModel } from 'src/app/models/calendar.model';
import { th } from 'date-fns/locale';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  events: CalendarModel[]= [
    //{ title: 'event1', start: '2021-06-27',end:'2021-06-30' },
    //{ title: 'event 2', start: '2021-06-30',end:'' },
    //{ title: 'even', start: '2021-06-01',end:'' }
  ];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: []= this.events,
    editable: true,
    eventStartEditable : true ,
  };
  addEvent!:CalendarModel;
   data!: AppointmentModel;
   subscriptionList: Subscription[] = [];
   app: any[] = [];
   dataTime!:Data;
  constructor(private router: Router, public  service: AppointmentService,private http:HttpClient) {}
  
  ngOnInit(){
    const words=this.router.url.split('/');
    this.http.get('http://localhost:8090/api/v1/appointment/'.concat((words[3]))).subscribe(data => {
      this.app.push(data);
      for(let ev of this.app ){
        for(let evv of ev){
        const setDataStart=evv['startTime'];
        const setDataEnd=evv['endTime'];
        const startTime=setDataStart.split('T');
        const endTime=setDataEnd.split('T');
        this.addEvent={
          title:evv['description'],
          start:startTime[0],
          end:endTime[0]
        }
        this.calendarOptions.events=this.events.concat({title: evv['description'], start:startTime[0], end:endTime[0]});
        this.events.push(this.addEvent);
        }
      }
    
 });
 }
 dateClick(event: any){
   console.log(event);
 }
}
