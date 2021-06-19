import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {PatientService} from "../../service/patient.service";
import {PatientModel} from "../../models/patient.model";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, OnDestroy {
  subscriptionList: Subscription[] = [];
  patient: PatientModel[] = [];
  appointmentByPatientId!: boolean;
  constructor(private router: Router, public  service: PatientService) { }

  ngOnInit(): void {
    this.subscriptionList.push(
      this.service.getPatients().subscribe(list => this.patient = list)
    )
  
}
  ngOnDestroy() {
    this.subscriptionList.forEach(subs => subs.unsubscribe())
  }
  showForm(){
    this.service.showPatientForm=true;
  }
  goToEdit(id: number) {
    this.router.navigate(['patients/edit/', id]);
  }

  onDelete(id: number){
    this.service.deletePatient(id).subscribe(() => this.patient= this.patient.filter((item) => item.patientId != id))
  }
  onView(id:number){
    console.log(id);
    this.appointmentByPatientId=true;
    this.router.navigate(['patients/appointmentsList/', id]);
    this.service.viewAppointments(id);
    console.log("u");
  }
}
