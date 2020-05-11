import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit() {
  
    this.loginForm= new FormGroup({
      password:new FormControl(null,[Validators.required])
    })
  }
  onSubmit()
  {
      this.http.post("http://localhost:1234/auth/admin",this.loginForm.value)
      .subscribe(
        (data:any)=>{
          console.log(data);
          localStorage.setItem("admin",data.id);
          this.router.navigate(["/auth","admin"]);
        },
        ()=>{
          alert("failure");
        },
        ()=>{}
      )
  }

}
