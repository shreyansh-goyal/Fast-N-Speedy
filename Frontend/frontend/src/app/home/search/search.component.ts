import { Component, OnInit } from '@angular/core';
import { RestaurantModel } from '../RestaurantModel/restaurant.model';
import {HomeService} from "../home.service";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search:string;
  restaurants:RestaurantModel[]; 
  constructor(private home:HomeService) { }

  ngOnInit() {
    this.restaurants=[...this.home.restaurants]
  }

}
