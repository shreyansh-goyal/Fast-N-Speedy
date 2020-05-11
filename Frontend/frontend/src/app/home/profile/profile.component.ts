import { Component, OnInit, Inject } from '@angular/core';
import {Store} from "@ngrx/store";
import * as AuthActions from "../../Auth/store/auth.actions"
import { Router } from '@angular/router';
import {ProfileService} from "./profile.service";
import {MatDialog} from "@angular/material";
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[ProfileService]
})
export class ProfileComponent implements OnInit {
  ordersData:any;
  user: any;
  constructor(private router:Router,private store:Store<{User:{user}}>,private pOrders:ProfileService,public dialog:MatDialog) { }

  ngOnInit() {
    this.store.select("User").subscribe(
      (data:any)=>{
        this.user=data.user;
        this.pOrders.getOrders(data.user.userId).subscribe(
          (data:any)=>{
              this.ordersData=[...data.data];
              console.log(this.ordersData);
          },
          (err)=>{
              console.log(err)
          }, 
          ()=>{
              console.log("Completed")
          }
        )
      }
    )
  }

  logout()
  {
    this.store.dispatch(new AuthActions.RemoveUser());
    document.cookie="";
    localStorage.setItem("user",JSON.stringify({}));
    this.router.navigate(["/auth","login"]);
  }
  openDialog(order)
  {
    this.dialog.open(DialogExampleComponent,{
      width:'400px',
      height:'300px',
      data:{order,user:this.user}
    });
  }
}
