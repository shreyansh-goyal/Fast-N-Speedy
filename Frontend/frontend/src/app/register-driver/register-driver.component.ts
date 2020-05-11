import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { LoginService } from '../Auth/login/login.service';
import {RegisterDriverService} from "./register-driver.service";
import { from } from 'rxjs';
@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.component.html',
  styleUrls: ['./register-driver.component.css']
})
export class RegisterDriverComponent implements OnInit {
  registerForm:FormGroup;
  valid:boolean;
  coordinates:{latitude,longitude}={latitude:undefined,longitude:undefined}
  constructor(private userLogin:LoginService,private router:Router,private store:Store<{User:{user:{}}}>,private registerDriver:RegisterDriverService) { }

  ngOnInit() {
    this.registerForm= new FormGroup({
      name:new FormControl(null,[Validators.required]),
      phoneNo:new FormControl(null,[Validators.required,Validators.pattern('[0-9]*')]),
      address:new FormControl(null,[Validators.required]),
      emailId:new FormControl(null,[Validators.required]),
      password:new FormControl(null,[Validators.required])
    })
    if(this.coordinates.latitude==undefined)
    {
      navigator.geolocation.getCurrentPosition(resp => {
        this.coordinates.latitude = resp.coords.latitude;
        this.coordinates.longitude = resp.coords.longitude;
      })
    }
  }
  onSubmit()
  {
    let data={
      ...this.registerForm.value,
      ...this.coordinates
    }
    this.registerDriver.postDriverDetails(data).subscribe(
      (data)=>{
        alert("Driver is registered in the database");
      },
      (err)=>{
        alert("Some error occured");
      },
      ()=>{
        console.log("request completed");
      }
    )
  }

}
