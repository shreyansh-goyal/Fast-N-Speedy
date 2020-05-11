import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as AuthActions from "../Auth/store/auth.actions";
@Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            })
export class HomeComponent implements OnInit {
  userData:any;
  user: any=undefined;
  constructor(private store:Store<{User:{user}}>,private router:Router,private http:HttpClient){
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
   }
  ngOnInit() {
    this.userData=this.store.select('User');
    this.userData.subscribe(
      (data)=>{
        this.user=data.user;
      },
      (err)=>{},
      ()=>{}
    )

    setTimeout(()=>{
      if(!this.user.jwtToken)
      {
        let storeData:any=JSON.parse(localStorage.getItem("user"));
        console.log(storeData);
        if(storeData.jwtToken)
        {
          console.log(`Bearer ${storeData.jwtToken}`);
          this.http.post("http://localhost:1234/verify/token",{data:"xyz"},{headers:{"Authorization": `Bearer ${storeData.jwtToken}`}})
          .subscribe(data=>{
            console.log("we get the data");
            this.store.dispatch(new AuthActions.AddUser({
              user:{
                ...storeData
            }}));
            this.router.navigate(["/home","scroll"]);
          },
          err=>{
            this.router.navigate(["/auth","login"])
          })
        }
        else
        {
          this.router.navigate(["/home","scroll"])
        }    
      }
    },100)
  }

}