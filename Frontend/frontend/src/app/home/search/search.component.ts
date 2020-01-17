import { Component, OnInit } from '@angular/core';
import { RestaurantModel } from '../RestaurantModel/restaurant.model';
import {HomeService} from "../home.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search:string;
  restaurants:RestaurantModel[]; 
  constructor(private home:HomeService,private router:Router) { }

  ngOnInit() {
    this.restaurants=[...this.home.restaurants]
  }
  loadRestaurant(res){
    console.log("loaded");
    let index=this.restaurants.findIndex(e=>{
      console.log(res);
      if(e["Details"].name==res.Details.name)
      {
        return true;
      }
    })
    console.log(index);

    setTimeout(()=>{
      this.router.navigate(['/home','restaurant',`${index}`]);
    },500)
  }
}
