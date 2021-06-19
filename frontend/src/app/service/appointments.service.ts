import { Injectable } from '@angular/core';
import {PatientModel} from "../models/patient.model";
import {AppointmentModel} from "../models/appointment.model"
import {from, Observable, Subject} from "rxjs";
import { ApiServiceService } from './api-service.service';
import { ApiEnum } from './api.enum';

@Injectable({
    providedIn: 'root'
  })

export class AppointmentService{
    showAppointmentForm: boolean=false;
    displayedColumns:string[]=['id','patientId', 'status', 'type','startTime','endTime', 'description','action','range' ];
    currentIndex=-1;
    constructor(private service:ApiServiceService){}

    public appointments:AppointmentModel[]=[];

    deleteAppointment(id:number){
       return this.service.submitDeleteRequest(ApiEnum.DELETE_APPOINTMENT+id)
    }
    getAppointments():Observable<AppointmentModel[]>
    {
        return this.service.submitGetRequest(ApiEnum.GET_APPOINTMENT);
    }
    getAppointmentById(appointmentId:number):Observable<AppointmentModel[]>
    {
        return this.service.submitGetRequest(ApiEnum.VIEW_APPOINTMENTS+`/${appointmentId}`);
    }
    postAppointment(appointment: AppointmentModel):Observable<AppointmentModel>{
        return this.service.submitPostRequest(ApiEnum.CREATE_APPOINTENT, appointment);
    }
    updateAppointment(newAppointment: AppointmentModel):Observable<AppointmentModel>{
        return this.service.submitPutRequest(ApiEnum.UPDATE_APPOINTENT, newAppointment);
    }
}