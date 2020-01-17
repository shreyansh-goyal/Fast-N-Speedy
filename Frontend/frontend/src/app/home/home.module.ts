import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { HeaderComponent } from './header/header.component'; 
import {HomeService}  from "./home.service";
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ShortenPipe } from '../shorten.pipe';
import {MatRippleModule} from '@angular/material/core'; 
import { RouterModule, Routes } from '@angular/router';
import { InHomeComponent } from './in-home/in-home.component';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { SearchComponent } from './search/search.component';
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { filterPipe } from './filter.pipe';
import { ProfileComponent } from './profile/profile.component';
import {MatButtonModule} from '@angular/material/button';
import { RestaurantComponent } from './restaurant/restaurant.component'; 
import {MatExpansionModule} from '@angular/material/expansion'; 
const routes:Routes=[
    {path:"",component:HomeComponent,children:[
        {path:"",component:InHomeComponent},
        {path:"search",component:SearchComponent},
        {path:"profile",component:ProfileComponent},
        {path:"restaurant/:id",component:RestaurantComponent},        
    ]},
    
]
@NgModule({
    declarations:[
        HomeComponent,
        HeaderComponent,
        ShortenPipe,
        InHomeComponent,
        SearchComponent,
        filterPipe,
        ProfileComponent,
        RestaurantComponent
    ],
    imports:[
        NgbModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        HttpClientModule,
        MatRippleModule,
        RouterModule.forChild(routes),
        CommonModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatExpansionModule
    ],
    exports:[
        
    ],
    providers:[
        HomeService,
        {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
    ]
})
export class HomeModule{

}