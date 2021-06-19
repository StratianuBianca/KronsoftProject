import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  constructor(private router: Router) {
  }
  goTo(path: string) {
      this.router.navigate([`patients/${path}`]);
    }
}

