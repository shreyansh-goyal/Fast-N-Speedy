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
import { RegisterComponent } from './register/register.component';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { RegisterDriverComponent } from './register-driver/register-driver.component';
import { AdminLoginComponent } from './Auth/admin-login/admin-login.component';
import { AdminPageComponent } from './Auth/admin-page/admin-page.component';
import { AuthGuard } from './auth.guard';
const appRoutes:Routes=[
    {path:"", redirectTo:'auth' ,pathMatch: 'full'},
    {path:"auth",component:AuthComponent,children:[
        {path:"signup",component:SignupComponent},
        {path:'signup/verify',component:VerifyComponent},
        {path:"login",component:LoginComponent},
        {path:"admin/login",component:AdminLoginComponent},
        {path:"admin",canActivate:[AuthGuard],component:AdminPageComponent}
    ]},
    {path:"home",loadChildren:'./home/home.module#HomeModule'},
    {path:"cart",component:CartComponent},
    {path:"delivery",component:DeliveryLoginComponent},
    {path:"delivery/home",component:DeliveryComponent},
    {path:"register",canActivate:[AuthGuard],component:RegisterComponent,children:[
        {path:"restaurant",component: RegisterRestaurantComponent},
        {path:"driver",component:RegisterDriverComponent}
    ]}
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