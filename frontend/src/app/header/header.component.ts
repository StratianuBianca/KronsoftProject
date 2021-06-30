import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {EventEmitter, Output} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router} from "@angular/router";
import { th } from 'date-fns/locale';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PatientModel } from '../models/patient.model';
export interface User {
  name: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  myControl = new FormControl();
  options: User[] = [];
  patient: PatientModel[] = [];
  filteredOptions!: Observable<User[]>;
  app: any[] = [];
  id:any;
  constructor(private router: Router,private http:HttpClient) {
  }

  async ngOnInit() {
    this.http.get('http://localhost:8090/api/v1/patient/all').subscribe(data => {
      this.app.push(data);
      for(let ev of this.app ){
        for(let evv of ev){
          this.options=this.options.concat({name: evv['lastName']+" "+ evv['firstName']});

        }}
        console.log(this.app);
    });
    await this.delay(1000);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );

  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  goTo(route: string) {
    this.router.navigate([route]).then((value)=> {console.log(value)});
  }

  @Output() featureSelected = new EventEmitter<string>();
  onSelect (feature: string) {
  this.featureSelected.emit(feature);
  }
 delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

 searchPatient(val: any){
  const words=val.split(' ');
  let idPatient:number;
  console.log("val");
  console.log(val);
  this.http.get('http://localhost:8090/api/v1/patient/id/'.concat(words[0]).concat("/").concat(words[1])).subscribe(data => {
  this.id=data;
  console.log(this.id);
  this.router.navigate(['patients/appointmentsList/', this.id]);
});
  idPatient=parseInt(this.id);
//console.log(this.id);
 //console.log(idPatient);
}
}

