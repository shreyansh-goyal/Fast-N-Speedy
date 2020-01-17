import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyService } from './verify.service';
import {Store} from "@ngrx/store";
import * as AuthActions from "../../store/auth.actions";
@Component({
  selector: 'app-verify-component',
  templateUrl: './verify-component.component.html',
  styleUrls: ['./verify-component.component.css']
})
export class VerifyComponent implements OnInit {
  emailId:string;
  otp:number;
  invalid:boolean=false;
  constructor(private currentRoute:ActivatedRoute,private router:Router,private verifier:VerifyService,private store:Store<{User:{user}}>) { }

  ngOnInit() {
    this.currentRoute.queryParams.subscribe(
      (data:{email})=>{
        console.log(data);
        this.emailId=data.email;
      }
    )
  }
  verifyOtp()
  {
    console.log(this.emailId);
    this.verifier.verifyOtp({otp:this.otp,emailId:this.emailId}).subscribe(
      (data)=>{
        this.store.dispatch(new AuthActions.AddUser({
          user:{
            "jwtToken":data["token"],
            ...data["user"].Details 
        }}));
      },
      (err)=>{
        this.invalid=true;
        console.log(err);
      },
      ()=>{
        this.router.navigate(["/home"])
      }
    )
  }

}
