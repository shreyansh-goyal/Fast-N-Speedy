import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantDeliveryService {

  constructor(private http:HttpClient) { }
  registerRestaurant(data:{img,name,phoneNo,address,landmark,latitude,longitude,rating,costForTwo,foodTypeServed,innerPhoto,menu})
  {
    return this.http.post("http://localhost:1234/auth/restaurant",data)
  }
  uploadImage(data)
  {
    return this.http.post("http://localhost:1234/upload",data)
  }
}
