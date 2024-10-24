import { Routes } from '@angular/router';
import { ContratousuarioComponent } from './components/contratousuario/contratousuario.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { RegistrarcontratousuarioComponent } from './components/contratousuario/registrarcontratousuario/registrarcontratousuario.component';
import { MetricasComponent } from './components/metricas/metricas.component';


export const routes: Routes = [
    //se adaptará luego
    {
        path: '', redirectTo: 'inicio', pathMatch: 'full' // Ruta predeterminada que redirige a 'inicio'
    },
    {
        path:'contratousuario',component:ContratousuarioComponent,
    },
    {
        path:'inicio',component:InicioComponent
    },
    {
        path:'contrato', component:ContratoComponent
    },
    {
        path:'fechacontrato',component:RegistrarcontratousuarioComponent
    },
    {
        path:'vermetricas',component:MetricasComponent
    }
];
