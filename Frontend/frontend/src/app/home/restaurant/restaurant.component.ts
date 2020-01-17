import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantModel } from '../RestaurantModel/restaurant.model';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurant:any;
  activeImage:Array<any>;
  image:Array<any>;
  orders:Array<any>=[];
  constructor(private route:ActivatedRoute,private home:HomeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params)=>{
        this.restaurant=this.home.restaurants[params.id];
        this.activeImage=this.restaurant["Details"].innerPhoto.slice(0,1);
        this.image=this.restaurant["Details"].innerPhoto.slice(1);
      }
    )
  }


}
