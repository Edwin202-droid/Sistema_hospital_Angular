import {RouterModule, Routes} from '@angular/router';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AdminGuard, LoginGuardGuard, VerificatokenGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
//import { BusquedaComponent } from './busqueda/busqueda.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        //protegiendo ruta
        canActivate: [LoginGuardGuard],
        children:[
            //Guard de Renovacion de token
            {path: 'dashboard', canActivate:[VerificatokenGuard],component: DashboardComponent, data:{ titulo: 'Dashboard' }},
            {path:'progress',component:ProgressComponent, data:{ titulo: 'ProgressBar' }},
            {path:'graficas1',component:Graficas1Component, data:{ titulo: 'Grafica #1' }},
            {path:'promesas',component:PromesasComponent, data:{ titulo: 'Promesas' }},
            {path:'rxjs',component:RxjsComponent, data:{ titulo: 'RxJs' }},
            //ingresando el account-settings
            {path:'account-settings',component:AccountSettingsComponent, data:{ titulo: 'Ajustes de cuenta' }},
            {path: 'perfil', component:ProfileComponent, data: {titulo: 'Perfil de usuario'} },
            {path: 'busqueda/:termino', component:BusquedaComponent, data: {titulo: 'Buscador'} },
            //Mantenimientos
            {   path: 'usuarios', 
                component: UsuariosComponent,
                //Metemos el Admin Guard en usuarios
                canActivate:[AdminGuard], 
                data: {titulo: 'Mantenimiento de Usuarios'}
            },
            {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
            {path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
            {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico'}},
            {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES= RouterModule.forChild(pagesRoutes);
