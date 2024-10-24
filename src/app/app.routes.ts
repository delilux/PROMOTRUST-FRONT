import { Routes } from '@angular/router';
import { ContratousuarioComponent } from './components/contratousuario/contratousuario.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { InicioComponent } from './components/inicio/inicio.component';


export const routes: Routes = [
    {
        path: '', redirectTo: '/bienvenido', pathMatch: 'full'
    },
    {
        path:'bienvenido',component:InicioComponent
    },
    {
        path:'contratousuario',component:ContratousuarioComponent
    },
    {
        path:'vermetricas',component:MetricasComponent
    },
    {
        path:'contrato',component:ContratoComponent
    },


];
