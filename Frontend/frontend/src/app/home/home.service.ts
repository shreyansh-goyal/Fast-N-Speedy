import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {RestaurantModel} from "./RestaurantModel/restaurant.model"
@Injectable()
export class HomeService{
    public restaurants:RestaurantModel[];
    constructor(private http:HttpClient){

    }
    getRestaurants()
    {
        return this.http.get<{Details:RestaurantModel[]}>("http://localhost:1234/restaurants");
    }
    setRestaurants(data)
    {
        this.restaurants=data;
    }
    getBanners()
    {
        return this.http.get("http://localhost:1234/getbanners")
    }
}
