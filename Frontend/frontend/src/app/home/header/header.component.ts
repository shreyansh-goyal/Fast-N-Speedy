import { Component, OnInit } from '@angular/core';
import {State} from "@ngrx/store"
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  address:string;
  constructor(private state:State<{User:{user}}>) { }

  ngOnInit() {
    this.address=this.state.getValue().User.user.address;
  }

}
