import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService{
    constructor(private http:HttpClient)
    {

    }
    userLogin(emailId,password)
    {
        return this.http.post("http://localhost:1234/auth/login",{emailId,password});
    }
}