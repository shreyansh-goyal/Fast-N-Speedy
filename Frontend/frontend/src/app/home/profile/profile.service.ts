import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ProfileService{
    previousOrders:any=[];
    constructor(private http:HttpClient){
        
    }
    getOrders()
    {
        this.http.get("http://localhost:1234/orders").subscribe(
            (data:any)=>{
                this.previousOrders=data.orders;
            },
            (err)=>{
                console.log(err)
            }, 
            ()=>{
                console.log("Completed")
            }
        )
    }
}