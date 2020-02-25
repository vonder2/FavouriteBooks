import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  links = ['First', 'Second'];
  activeLink = this.links[0];

  constructor(public router: Router) { }

  ngOnInit(): void {
  }


}
