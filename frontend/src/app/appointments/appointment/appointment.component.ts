import { Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AppointmentService} from "../../service/appointments.service";
import {AppointmentModel} from "../../models/appointment.model";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit, OnDestroy {

  public successMsg!:string;
  public errorMsg!:string;

  subscriptionList: Subscription[] = [];
  app: AppointmentModel[] = [];

  constructor(private router: Router, public  service: AppointmentService) { }

  ngOnInit(): void {
    this.successMsg='';
    this.errorMsg='';
    if(this.router.url==='/appointments/list'){
    this.subscriptionList.push(this.service.getAppointments().subscribe(list=>{this.app=list
      for(let appointme of this.app){
        const words=appointme.startTime.split("T");
        appointme.startTime=words[0];
        const words2=appointme.endTime.split("T");
        appointme.endTime=words2[0];
      }
    }));
    }
    else{
      const words=this.router.url.split('/');
      this.subscriptionList.push(this.service.getAppointmentById(parseInt(words[3])).subscribe(list=>{this.app=list
      for(let appointme of this.app){
        const words=appointme.startTime.split("T");
        appointme.startTime=words[0];
        const words2=appointme.endTime.split("T");
        appointme.endTime=words2[0];
      }
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptionList.forEach(subs => subs.unsubscribe())
  }

  showForm() {
    this.service.showAppointmentForm = true;
  }
  goToEdit(id: number) {
    this.router.navigate(['appointments/edit/', id]);
  }

  onDelete(id: number){
    this.service.deleteAppointment(id).subscribe(() => this.app = this.app.filter((item) => item.appointmentId != id));
  }

}
