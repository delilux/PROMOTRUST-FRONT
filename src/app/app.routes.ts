import { Routes } from '@angular/router';
import { ContratousuarioComponent } from './components/contratousuario/contratousuario.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertarUsuarioComponent } from './components/usuario/insertar-usuario/insertar-usuario.component';


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
//usuario
{
    path: 'listarusuario', component: UsuarioComponent,
    children: [
        { path: 'insertarusuario', component: InsertarUsuarioComponent},
        
    ],
},

];
