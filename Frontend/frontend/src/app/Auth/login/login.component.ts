import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import * as AuthActions from "../store/auth.actions";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private userLogin:LoginService,private router:Router,private store:Store<{User:{user:{}}}>,private http:HttpClient) { }

  ngOnInit() {
    let array:any=document.cookie.split(';');
    let storeData:any=JSON.parse(localStorage.getItem("user"));
    console.log(storeData);
    if(storeData&&storeData.jwtToken)
    {
      this.http.post("http://localhost:1234/verify/token",{data:"xyz"},{headers:{"Authorization": `Bearer ${storeData.jwtToken}`}})
      .subscribe(data=>{
        console.log(data);
        this.store.dispatch(new AuthActions.AddUser({
          user:{
            ...storeData
        }}));
        this.router.navigate(["/home"])
      },
      err=>{
        this.router.navigate(["/auth","login"])
      })
    }
    else
    {
      console.log("In the else code");
    }
    navigator.geolocation.getCurrentPosition(resp=>{
      console.log(resp);
      localStorage.setItem("latitude",JSON.stringify(resp.coords.latitude));
      localStorage.setItem("longitude",JSON.stringify(resp.coords.longitude));
    },(err)=>{
      console.log(err);
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
      (data:{token})=>{
      let x={
        "jwtToken":data["token"],
        ...data["user"].Details
      }
      localStorage.setItem("user",JSON.stringify(x))
        this.store.dispatch(new AuthActions.AddUser({
          user:{
            "jwtToken":data["token"],
            ...data["user"].Details 
        }}));
      },
      (err)=>{
        alert(err.error.message);
        console.log("there is some error");
      },
      ()=>{
        alert("Hello this is the message");
        this.router.navigate(['/home'])
      }
    )
  }

}
