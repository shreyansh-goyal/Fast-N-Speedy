import {Injectable } from '@angular/core';

@Injectable()
export class CartService{
    orders:Array<any>;
    restaurant:any;
    setOrders(order)
    {
        this.orders=[...order];
    }
    setRestaurant(restaurant)   
    {
        this.restaurant=restaurant;
    }
    getOrders()
    {
        return [...this.orders]
    }
}   