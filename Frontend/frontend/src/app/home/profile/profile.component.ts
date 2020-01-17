import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as AuthActions from "../../Auth/store/auth.actions"
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router:Router,private store:Store<{User:{user}}>) { }

  ngOnInit() {
  }

  logout()
  {
    this.store.dispatch(new AuthActions.RemoveUser());
    this.router.navigate(["/auth","login"]);
  }
}
