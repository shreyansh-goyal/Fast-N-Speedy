import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService{
    constructor(private http:HttpClient)
    {
    }
    signup(data:{name,emailId,phoneNo,addres,landmark,password,latitude,longitude})
    {
        return this.http.post("http://localhost:1234/auth/signup",data)
    }
}