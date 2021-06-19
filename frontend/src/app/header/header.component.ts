import { Component, OnInit } from '@angular/core';
import {EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  constructor(private router: Router) {
  }
  goTo(route: string) {
    this.router.navigate([route]).then((value)=> {console.log(value)});
  }

  @Output() featureSelected = new EventEmitter<string>();
  onSelect (feature: string) {
  this.featureSelected.emit(feature);
  }
 

}
