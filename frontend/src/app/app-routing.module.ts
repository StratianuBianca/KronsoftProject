import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppointmentsComponent} from "./appointments/appointments.component";
import {AppointmentComponent} from "./appointments/appointment/appointment.component";
import {AppointmentFormComponent} from "./appointments/appointment-form/appointment-form.component";
import {PatientComponent} from "./patients/patient/patient.component";
import {PatientsComponent} from "./patients/patients.component";
import {PatientFormComponent} from "./patients/patient-form/patient-form.component";
import { PatientCalendarComponent } from './appointments/patient-calendar/patient-calendar.component';
import { CalendarComponent } from "../app/appointments/calendar/calendar.component";
const routes: Routes = [
  {path:"appointments", component:AppointmentsComponent,children:[
    {path:'edit/:id', component:AppointmentFormComponent},
    {path:'add', component:AppointmentFormComponent},
    {path:'list', component:AppointmentComponent},
    {path:'**', redirectTo:'/appointments/list', pathMatch:'full'}
  
]},
{path: "patients", component:PatientsComponent,children:[
  {path: 'edit/:id', component:PatientFormComponent},
  {path: 'add', component:PatientFormComponent},
  {path: 'list', component:PatientComponent},
  {path:'appointmentsList/:id', component:AppointmentComponent},
  {path:'appointmentsCalendar/:id', component:PatientCalendarComponent},
  {path:'calendar/:id', component:CalendarComponent},
  {path: '**', redirectTo: '/patients/list', pathMatch: 'full'}

]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 