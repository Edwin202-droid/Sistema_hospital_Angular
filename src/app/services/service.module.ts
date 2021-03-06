import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  SettingsService, 
          SharedService, 
          SidebarService, 
          UsuarioService,
          LoginGuardGuard,
          SubirArchivoService,
          HospitalService,
          MedicoService,
          AdminGuard,
          VerificatokenGuard } from "./services.index";
          
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    AdminGuard,
    VerificatokenGuard
  ],
})
export class ServiceModule { }
