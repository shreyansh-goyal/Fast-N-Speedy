import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {State} from "@ngrx/store"
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private state:State<{User:{user:{}}}>){

    }
    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{

        console.log("correct request",req)
        if(req.url.includes("auth"))
        {
            return next.handle(req);
        }
        const reqClone=req.clone({
            setHeaders:{
                'Authorization': `Bearer ${this.state.getValue().User.user.jwtToken}`
            }
        })
        console.log("duplicate request",reqClone);
        return next.handle(reqClone);    
    }
}