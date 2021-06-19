import { Injectable } from '@angular/core';
import {PatientModel} from "../models/patient.model";
import {Observable, Subject} from "rxjs";
import { ApiServiceService } from './api-service.service';
import { ApiEnum } from './api.enum';
import { AppointmentModel } from '../models/appointment.model';

@Injectable({
    providedIn: 'root'
  })

export class PatientService{
    showPatientForm: boolean=false;
    displayedColumns:string[]=['id','firstName', 'lastName','phoneNumber', 'sex', 'birthDate', 'city', 'country' ,'action'];
   currentIndex=-1;
    constructor(private service:ApiServiceService){}

    public patients:PatientModel[]=[];

    deletePatient(id:number){
      return  this.service.submitDeleteRequest(ApiEnum.DELETE_PATIENT+id);
    }
    getPatientById(patientId:number):Observable<PatientModel>{
        return this.service.submitGetRequest(ApiEnum.GET_PATIENT+`/${patientId}`)
    }
    getPatients(): Observable<PatientModel[]>{
        console.log(ApiEnum.GET_PATIENT);
        return this.service.submitGetRequest(ApiEnum.GET_PATIENT);

    }
    postPatient(patient: PatientModel):Observable<PatientModel>{
        return this.service.submitPostRequest(ApiEnum.CREATE_PATIENT, patient);
    }
    updatePatient( newPatient:PatientModel):Observable<PatientModel>{
        return this.service.submitPutRequest(ApiEnum.UPDATE_PATIENT, newPatient);
    }
    viewAppointments(patientId:number):Observable<AppointmentModel>{
        console.log("yesIntra");
        console.log(ApiEnum.VIEW_APPOINTMENTS+`/${patientId}`);
        return this.service.submitGetRequest(ApiEnum.VIEW_APPOINTMENTS+`/${patientId}`);
    }
}