import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantModel } from '../RestaurantModel/restaurant.model';
import { HomeService } from '../home.service';
import { CartService } from '../shared/cart.service';

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
  totalCost:number=0;
  constructor(private route:ActivatedRoute,private home:HomeService,private router:Router,private cart:CartService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params)=>{
        this.restaurant=this.home.restaurants[params.id];
        this.activeImage=this.restaurant["Details"].innerPhoto.slice(0,1);
        this.image=this.restaurant["Details"].innerPhoto.slice(1);
        console.log(this.image);
      }
    )

  }
  computeCost()
  {
    console.log(this.orders);
    this.totalCost=0;
    for(let dish of this.orders){
      this.totalCost=this.totalCost+dish.price*dish.quantity;
    }
  }
  addToCart(dish:any)
  {
    console.log(dish);
    let order={...dish};
    order.quantity=1;
    let a=this.orders.filter(element=>{
      return element.food==order.food;
    })
    if(!a.length)
    this.orders.push(order);
    else
    ;
    this.computeCost()
  }
  increaseQuantity(index:number)
  {
    this.orders[index].quantity++;
    this.computeCost();
  }
  decreaseQuantity(index:number)
  {
    if(this.orders[index].quantity>1)
    {
      this.orders[index].quantity--;
      this.computeCost()
    }
    else
    {

      this.orders.splice(index,index+1);
      this.computeCost()
    }
  }
  goToCart()
  {
    this.cart.setOrders(this.orders);
    this.cart.setRestaurant(this.restaurant);
    this.router.navigate(['/cart'])
  }
}
