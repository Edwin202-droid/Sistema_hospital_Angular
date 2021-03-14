import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

//Modulos
import { PagesModule } from './pages/pages.module';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { APP_ROUTES } from './app-routing.module';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    RegisterComponent
    
    /* DashboardComponent,
    ProgressComponent,
    Graficas1Component, 
    PagesComponent */
    /* HeaderComponent,
    NopagefoundComponent,
    SidebarComponent,
    BreadcrumbsComponent */
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    //importando los modulos para que funcionen el app.module
    PagesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
