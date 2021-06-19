import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent{
    constructor(private router: Router) {
    }
    goTo(path: string) {
        this.router.navigate([`appointments/${path}`]);
      }
}