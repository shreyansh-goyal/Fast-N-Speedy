import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements AfterViewInit,OnInit {
  latitude:any;
  longitude:any;
  signupForm:FormGroup;
  location:boolean;
  signupSubscription:Subscription;

  constructor(private auth:AuthService,private router:Router) { } 
  ngOnInit()
  {
    this.signupForm= new FormGroup({
      "name":new FormControl(null,Validators.required),
      "phoneNo":new FormControl(null,[Validators.required,Validators.minLength(10)]),
      "emailId":new FormControl(null,[Validators.required,Validators.email]),
      "address":new FormControl(null,Validators.required),
      "landmark":new FormControl(null,Validators.required),
      "password":new FormControl(null,Validators.required)
    })
  }
  ngAfterViewInit(){
      navigator.geolocation.getCurrentPosition(resp=>{
        this.latitude=resp.coords.latitude;
        this.longitude=resp.coords.longitude;
      })
  }
  onSubmit()
  {
    console.log(this.signupForm);
    if(this.signupForm.status=="INVALID")
    {
      alert("Form fields are not correct");
    }
    else if(this.latitude==undefined)
    {
      navigator.geolocation.getCurrentPosition(resp=>{
        this.latitude=resp.coords.latitude;
        this.longitude=resp.coords.longitude;
      })
    }
    else
    {
      this.signupSubscription=this.auth.signup({...this.signupForm.value,latitude:this.latitude,longitude:this.longitude}).subscribe(
        (data:any)=>{
          console.log(data);
        }, 
        (err)=>{
          alert("There is error in creating the record may be the record already exsist");
        },
        ()=>{
          this.router.navigate(['auth/signup/verify'],{queryParams:{email:this.signupForm.value.emailId}})
        }
      )
    }
  }
}
