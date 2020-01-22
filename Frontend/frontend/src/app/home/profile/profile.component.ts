import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as AuthActions from "../../Auth/store/auth.actions"
import { Router } from '@angular/router';
import {ProfileService} from "./profile.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ProfileService]
})
export class ProfileComponent implements OnInit {

  constructor(private router:Router,private store:Store<{User:{user}}>,private pOrders:ProfileService) { }

  ngOnInit() {
  }

  logout()
  {
    this.store.dispatch(new AuthActions.RemoveUser());
    this.router.navigate(["/auth","login"]);
  }
}
