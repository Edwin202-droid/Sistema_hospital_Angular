import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

//Modulos
import { PagesModule } from './pages/pages.module';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { APP_ROUTES } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//servicio
import { ServiceModule } from './services/service.module';



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
    FormsModule,
    ReactiveFormsModule,
    //modulo de servicios
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
