import { Component, OnInit} from '@angular/core';
import {HomeService} from "./home.service"; 
import {RestaurantModel} from "./RestaurantModel/restaurant.model"
@Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            })
export class HomeComponent implements OnInit {
  constructor() {
   }

  ngOnInit() {
  }
}