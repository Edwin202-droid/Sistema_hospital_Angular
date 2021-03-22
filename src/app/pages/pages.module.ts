import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
//Modulo usado en la paginas
import { SharedModule } from "../shared/shared.module";
//componentes
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { PAGES_ROUTES } from "./pages.routes";
import { ProgressComponent } from "./progress/progress.component";

import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
    declarations:[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent
    ],
    exports:[
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        //para usar el shared en las paginas
        SharedModule,
        //para eusar nuestras rutas
        PAGES_ROUTES,
        FormsModule,
        ChartsModule

    ]
})

export class PagesModule {}