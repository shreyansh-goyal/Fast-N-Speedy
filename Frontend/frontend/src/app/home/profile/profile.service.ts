import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ProfileService{
    previousOrders:any=[];
    constructor(private http:HttpClient){
        
    }
    getOrders(userId)
    {
        return this.http.get(`http://localhost:1234/order?userId=${userId}`);
    }
}