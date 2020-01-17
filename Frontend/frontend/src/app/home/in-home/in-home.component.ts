import { Component, OnInit } from '@angular/core';
import {HomeService} from "../home.service"; 
import {RestaurantModel} from "../RestaurantModel/restaurant.model";
import { Router } from '@angular/router';
@Component({
  selector: 'app-in-home',
  templateUrl: './in-home.component.html',
  styleUrls: ['./in-home.component.css']
})
export class InHomeComponent implements OnInit {
  restaurants:RestaurantModel[];
  images = ["http://www.btwindia.com/assets/images/banner/New/Banners-02.jpg","http://www.btwindia.com/assets/images/banner/New/Banners-03.jpg"]
  activeImage=["http://www.btwindia.com/assets/images/banner/New/Banners-01.jpg"]
  private items: any[] = [{
    id: '1',
    value: 21
  },{
    id: '2',
    value: 4
  },{
    id: '4',
    value: 12
  },{
    id: '8',
    value: 11
  }];
  constructor(private home:HomeService,private router:Router) {
   }
  ngOnInit() {
    console.log("fetching the restaurants");
    this.home.getRestaurants().subscribe(
      (data)=>{
        this.home.setRestaurants(data);
        this.restaurants=[...this.home.restaurants];        
    },
    (err)=>{
        alert("There is some error check the console");
    },
    ()=>{
        console.log("completed");
    }
    )
  }
  loadRestaurant(){
    this.router.navigate(["/home","restaurant",`${1}`])
  }

}



