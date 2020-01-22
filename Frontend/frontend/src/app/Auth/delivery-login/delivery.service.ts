import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class deliveryService{

    constructor(private http:HttpClient){

    }
    deliveryBoyLogin(emailId,password)
    {
        return this.http.post("http://localhost:1234/auth/deliveryLogin",{emailId,password});
    }   
}