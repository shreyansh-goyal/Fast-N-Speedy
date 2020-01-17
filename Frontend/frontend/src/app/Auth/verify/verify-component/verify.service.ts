import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class VerifyService{
    constructor(private http:HttpClient){

    }
    verifyOtp(obj)
    {
        return this.http.post("http://localhost:1234/auth/verify",{otp:obj.otp,emailId:obj.emailId})
    }
}