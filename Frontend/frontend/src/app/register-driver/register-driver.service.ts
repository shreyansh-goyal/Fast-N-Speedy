import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterDriverService {

  constructor(private http:HttpClient) { }
  postDriverDetails(data)
  {
    return this.http.post("http://localhost:1234/deliveryBoy",data);
  }
}
