import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {PatientsComponent} from "./patients/patients.component";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientComponent } from './patients/patient/patient.component';
import { PatientFormComponent } from './patients/patient-form/patient-form.component';
import { AppointmentComponent } from './appointments/appointment/appointment.component';
import { CalendarComponent } from './appointments/calendar/calendar.component';
import { AppointmentFormComponent } from './appointments/appointment-form/appointment-form.component'; 
import {ReactiveFormsModule} from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import {AppointmentsComponent} from "../app/appointments/appointments.component";
import {RouterModule} from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarModule } from './appointments/calendar/calendar.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PatientComponent,
    PatientFormComponent,
    AppointmentComponent,
    AppointmentFormComponent,
    PatientsComponent,
    AppointmentsComponent,
    CalendarComponent,
  ],
  imports: [
    MatNativeDateModule,
    MatDatepickerModule,
    CalendarModule,
    BrowserModule,
    FormsModule,
    FullCalendarModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
