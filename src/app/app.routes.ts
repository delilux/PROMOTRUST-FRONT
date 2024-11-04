import { Routes } from '@angular/router';
import { ContratousuarioComponent } from './components/contratousuario/contratousuario.component';
import { MetricasComponent } from './components/metricas/metricas.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { InsertarUsuarioComponent } from './components/usuario/insertar-usuario/insertar-usuario.component';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { CreaeditapreguntasComponent } from './components/preguntas/creaeditapreguntas/creaeditapreguntas.component';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { CreaeditaincidenciasComponent } from './components/incidencias/creaeditaincidencias/creaeditaincidencias.component';
import { TipsComponent } from './components/tips/tips.component';
import { CreaditatipsComponent } from './components/tips/creaditatips/creaditatips.component';


export const routes: Routes = [
    {
        path: '', redirectTo: '/bienvenido', pathMatch: 'full'
    },
    {
        path:'bienvenido',component:InicioComponent
    },
    {
        path:'contratousuario',component:ContratousuarioComponent
    },{
        path: 'preguntas', component: PreguntasComponent,
        children: [
            {
                path: 'nuevo', component: CreaeditapreguntasComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditapreguntasComponent
            }
        ]
    },
    {
        path: 'incidencias', component: IncidenciasComponent, // corregido el typo aquí
        children: [
            {
                path: 'nuevo', component: CreaeditaincidenciasComponent
            },
            {
                path: 'ediciones/:id', component: CreaeditaincidenciasComponent
            }
        ]
    },
    {
        path:'vermetricas',component:MetricasComponent
    },
    {
        path:'contrato',component:ContratoComponent
    },
    {
        path:'vertips',component:TipsComponent,
        children: [
            {
                path: 'nuevo', component: CreaditatipsComponent
            },
            {
                path: 'ediciones/:id', component: CreaditatipsComponent
            }
        ],
        
    },


//usuario
{
    path: 'usuario', component: UsuarioComponent,
    children: [
        {
            path: 'nuevo', component: InsertarUsuarioComponent
        },
        {
            path: 'ediciones/:id', component: InsertarUsuarioComponent
        }
    ],
},
]