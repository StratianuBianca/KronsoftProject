import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,FormControl, NgForm} from "@angular/forms";
import {AppointmentModel} from "../../models/appointment.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentService} from "../../service/appointments.service";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface Type{
  value:string;
  viewValue:string;
}
interface Status{
  value:string;
  viewValue:string;
}
@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})

export class AppointmentFormComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  form: FormGroup;

  selectedValue!:string;
  selectedStatus!:string;

  constructor(private fb: FormBuilder, private  route: ActivatedRoute, private  router: Router, public service: AppointmentService) {
    this.form = this.fb.group({
      id: null,
      status:'',
      type:'',
      patientId:'',
      startTime:'',
      endTime:'',
      description: '',
    })
  }

  types:Type[]=[
    {value:'Regular', viewValue:'Regular'},
    {value:'Holiday', viewValue:'Holiday'},
    {value:'Vacantion', viewValue:'Vacantion'},
    {value:'Group', viewValue:'Group'}
  ];

  statuses:Status[]=[
    {value:'Created', viewValue:'Created'},
    {value:'Planned', viewValue:'Planned'},
    {value:'Confirmed', viewValue:'Confirmed'},
    {value:'Closed', viewValue:'Closed'},
    {value:'Canceled', viewValue:'Canceled'}
  ];
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.loadAppointment(param.id);
 })
  }
  public loadAppointment(id: string) {
    const appointment = this.service.appointments.find((appointment) => appointment.appointmentId === parseInt(id));
  
    this.form.patchValue({
      id: appointment?.appointmentId,
      description: appointment?.description,
      status: appointment?.status,
      type:appointment?.type,
      startTime:appointment?.startTime,
      endTime:appointment?.endTime,
      patientId:appointment?.patientId
    })
  }


  public saveData( valid:any){
    const appointment: AppointmentModel={
      appointmentId:parseInt(this.form.value['id']),
      description:this.form.value['description'],
      status:this.selectedStatus,
      type:this.selectedValue,
      patientId:parseInt(this.form.value['patientId']),
      startTime:this.range.value['start'],
      endTime:this.range.value['end'],
    }
    if(appointment.appointmentId && valid){
      this.service.updateAppointment(appointment).subscribe(() => this.goToList(),(err) => console.log(err) );
    }else{
      if(valid){
      this.service.postAppointment(appointment).subscribe(() => this.goToList());
    }}
  }
  goToList() {
    this.router.navigate([`appointments/list`])
  }

}
