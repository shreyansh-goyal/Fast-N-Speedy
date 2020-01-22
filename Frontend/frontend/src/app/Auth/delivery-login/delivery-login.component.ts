import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { deliveryService } from './delivery.service';
import { Store } from '@ngrx/store';
import * as AuthActions from "../store/auth.actions"
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-login',
  templateUrl: './delivery-login.component.html',
  styleUrls: ['./delivery-login.component.css'],
  providers:[deliveryService]
})
export class DeliveryLoginComponent implements OnInit {
  loginForm:FormGroup;
  latitude:number;
  longiutde:number;
  constructor(private router:Router,private delLogin:deliveryService,private store:Store<{User:{user}}>) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(resp=>{
      localStorage.setItem("latitude",JSON.stringify(resp.coords.latitude));
      localStorage.setItem("longitude",JSON.stringify(resp.coords.longitude));
      this.latitude=resp.coords.latitude;
      this.longiutde=resp.coords.longitude;
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
    this.delLogin.deliveryBoyLogin(this.loginForm.value.emailId,this.loginForm.value.password)
    .subscribe(
      (data)=>{
        console.log("data is",data);
        this.store.dispatch(new AuthActions.AddUser({
          user:{
            "jwtToken":data["token"],
            ...data["user"].Details 
        }}));
      },
      (err)=>{alert(err.error.message)},
      ()=>{
        this.router.navigate(['/delivery','home'])
      }
    )
  }
}
