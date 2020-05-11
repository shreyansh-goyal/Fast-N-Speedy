import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {
  feedback:any;
  rating:any;
  constructor(
    public dialogRef: MatDialogRef<DialogExampleComponent>,@Inject(MAT_DIALOG_DATA) public data:any,public http:HttpClient) {
      console.log("this was the data",data);
    }
  ngOnInit() {
  }
  rateRestaurant(){
    console.log("this is the data",this.data);
    this.http.post("http://localhost:1234/reviewRestaurant",{
      resId:this.data.order.resId,
      ratings:this.rating,
      feedback:this.feedback,
      user:this.data.user
    }).subscribe(
      (data)=>{
        console.log(data);
        this.dialogRef.close();
      },
      (err)=>{
        this.dialogRef.close();
        alert("Sorry your review is not uploaded.Maybe this is your second review on the same order!")
      },
      ()=>{
        console.log("completed the work");
      }
    )
  }
  cancel(){
  this.dialogRef.close(); 
  }
}
