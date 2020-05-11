import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import * as AuthActions from "./Auth/store/auth.actions";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router:Router,private http:HttpClient,private store:Store<{User:{user:{}}}>)
  {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    } 
  }
  ngOnInit()
  {

  }
}