import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private router:Router,private store:Store<{User:{user:{}}}>,private http:HttpClient) { }

  ngOnInit() {
    this.loginForm= new FormGroup({
      banners:new FormArray([])
    })
    if(!localStorage.getItem("admin"))
      this.router.navigate(["/auth","admin","login"]);
    else{
      this.http.get("http://localhost:1234/getbanners").
      subscribe(
        (data:any)=>{
          if(data.length>0)
          {
            let bannerArray=data[0].Details.banners;
            this.insertFormControl(bannerArray);
          }
          else
          {
            alert("data id invalid contact your engineers");
            this.router.navigate(["/auth","admin","login"]);    
          }
        },
        (err)=>{
          alert(err.message);
          this.router.navigate(["/auth","admin","login"]);          
        },
        ()=>{

        }
      )
    }
    } 
  insertFormControl(bannerArray)
  {
    for(let bannerValue of bannerArray)
    {
      let formControl:FormControl=new FormControl(bannerValue,Validators.required);
      (<FormArray>this.loginForm.get("banners")).push(formControl);   
    }
  }
  deleteFormControl()
  {
    (<FormArray>this.loginForm.get("banners")).removeAt((<FormArray>this.loginForm.get('banners')).length-1); 
  }
  addFormControl()
  {
    let formControl:FormControl=new FormControl(null,Validators.required);
    (<FormArray>this.loginForm.get("banners")).push(formControl);
  }
  RegisterDriver()
  {
    this.router.navigate(["register","driver"]);
  }
  RegisterRestaurant()
  {
    this.router.navigate(["register","restaurant"]);
  }
  onSubmit()
  {
    let data={
      id:parseInt(localStorage.getItem("admin")),
      ...this.loginForm.value
    };
    this.http.post("http://localhost:1234/banner",data).
    subscribe(
      (data)=>{
        alert("uploaded")
      },
      (err)=>{
        alert(err.message)
      },
      ()=>{
        ;
      }
    )
  }
}