import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Auth/signup/signup.component';
import { VerifyComponent } from './Auth/verify/verify-component/verify-component.component';
import {LoginComponent} from "./Auth/login/login.component"
import { HomeComponent } from './home/home.component';
import {AuthComponent} from "./Auth/auth/auth.component"
import { CartComponent } from './cart/cart.component';
import { DeliveryComponent } from './DeliveryBoy/delivery/delivery.component';
import {DeliveryLoginComponent} from "./Auth/delivery-login/delivery-login.component"
const appRoutes:Routes=[
    {path:"", redirectTo:'auth' ,pathMatch: 'full'},
    {path:"auth",component:AuthComponent,children:[
        {path:"signup",component:SignupComponent},
        {path:'signup/verify',component:VerifyComponent},
        {path:"login",component:LoginComponent},   
    ]},
    {path:"home",loadChildren:'./home/home.module#HomeModule'},
    {path:"cart",component:CartComponent},
    {path:"delivery",component:DeliveryLoginComponent},
    {path:"delivery/home",component:DeliveryComponent}
  ] 
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}