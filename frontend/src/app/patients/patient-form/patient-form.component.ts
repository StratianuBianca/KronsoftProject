import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {PatientModel} from "../../models/patient.model";
import {PatientService} from "../../service/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
interface Gender{
  value:string;
  viewValue:string;
}
@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})

export class PatientFormComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<PatientModel>();


  range = new FormGroup({
    birth: new FormControl(),
  });
  form:FormGroup;

  selectedGender!:string;

  genders: Gender[]=[
    {value:'Male', viewValue:'Male'},
    {value:'Female', viewValue:'Female'},
    {value:'Undefined', viewValue:'Undefined'}
  ]

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public service: PatientService) { 
    this.form=this.fb.group({
      id:null,
      firstName:null,
      lastName:null,
      phoneNumber:null,
      sex:null,
      city:null,
      country:null,
      birthDate:null
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((param)=>{this.loadPatient(param.id);}
    )
  }
  public loadPatient(id:string){
    const patient=this.service.getPatientById(parseInt(id)).subscribe((patient:PatientModel)=>{
      this.form.patchValue({
        id:patient?.patientId,
        firstName:patient?.firstName,
        lastName:patient?.lastName,
        phoneNumber:patient?.phoneNumber,
        sex:patient?.sex,
        city:patient?.city,
        country:patient?.country,
        birthDate:patient?.birthDate
      })
    })
  }
  saveData(valid: any){
    const patient:PatientModel={
      patientId:this.form.value['id'],
      firstName:this.form.value['firstName'],
      lastName:this.form.value['lastName'],
      city:this.form.value['city'],
      country:this.form.value['country'],
      birthDate:this.range.value['birth'],
      phoneNumber:this.form.value['phoneNumber'],
      sex:this.selectedGender,
    }
    if(patient.patientId && valid){
      this.service.updatePatient(patient).subscribe(() => this.goToList(),(err) => console.log(err) );
    }else{
      if(valid){
      this.service.postPatient(patient).subscribe(() => this.goToList());
    }}
  }

  goToList(){
    this.router.navigate([`patients/list`])
  }

}
