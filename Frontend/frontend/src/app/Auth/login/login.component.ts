import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import * as AuthActions from "../store/auth.actions"
import {State} from "../store/auth.reducer"
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private userLogin:LoginService,private router:Router,private store:Store<{User:{user:{}}}>) { }

  ngOnInit() {

    navigator.geolocation.getCurrentPosition(resp=>{
      localStorage.setItem("latitude",JSON.stringify(resp.coords.latitude));
      localStorage.setItem("longitude",JSON.stringify(resp.coords.longitude));
    })
    this.loginForm= new FormGroup({
      emailId:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,[Validators.required])
    })
  }
  onSubmit()
  {
    this.userLogin.userLogin(this.loginForm.value.emailId,this.loginForm.value.password)
    .subscribe(
      (data)=>{
        this.store.dispatch(new AuthActions.AddUser({
          user:{
            "jwtToken":data["token"],
            ...data["user"].Details 
        }}));
      },
      (err)=>{alert(err.error.message)},
      ()=>{
        this.router.navigate(['/home']);
      }
    )
  }

}
