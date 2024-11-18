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
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CreaeditaserviciosComponent } from './components/servicios/creaeditaservicios/creaeditaservicios.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { CreaeditaevaluacionComponent } from './components/evaluacion/creaeditaevaluacion/creaeditaevaluacion.component';
import { LoginComponent } from './components/login/login.component';
import { segGuard } from './guard/seguridad.guard';
import { LandingComponent } from './components/landing/landing.component';
import { ListarcontratoComponent } from './components/contrato/listarcontrato/listarcontrato.component';
import { EditarcontratoComponent } from './components/contrato/editarcontrato/editarcontrato.component';
import { CreaeditacontratousuarioComponent } from './components/contratousuario/creaeditacontratousuario/creaeditacontratousuario.component';
import { ActualizarcontratousuarioComponent } from './components/contratousuario/actualizarcontratousuario/actualizarcontratousuario.component';
import { RegistrarcontratoComponent } from './components/contrato/registrarcontrato/registrarcontrato.component';
import { RegistarcontratousuarioComponent } from './components/contratousuario/registarcontratousuario/registarcontratousuario.component';
import { CreaeditametricaComponent } from './components/metricas/creaeditametrica/creaeditametrica.component';
import { ActualizarmetricaComponent } from './components/metricas/actualizarmetrica/actualizarmetrica.component';
import { RegistrarmetricaComponent } from './components/metricas/registrarmetrica/registrarmetrica.component';
import { CantidadmetricasestadocontratoComponent } from './components/reportes/cantidadmetricasestadocontrato/cantidadmetricasestadocontrato.component';
import { ContratoingresostotalesComponent } from './components/reportes/contratoingresostotales/contratoingresostotales.component';
import { IncidenciascontratoComponent } from './components/reportes/incidenciascontrato/incidenciascontrato.component';
import { ServicioxcategoriaComponent } from './components/reportes/servicioxcategoria/servicioxcategoria.component';
import { RolesComponent } from './components/roles/roles.component';
import { InsertarrolesComponent } from './components/roles/insertarroles/insertarroles.component';
import { ActivoComponent } from './components/reportes/activo/activo.component';
import { CategoriausuarioComponent } from './components/reportes/categoriausuario/categoriausuario.component';
import { PagoComponent } from './components/pago/pago.component';
import { CreaeditapagoComponent } from './components/pago/creaeditapago/creaeditapago.component';
import { MetodopagoComponent } from './components/metodopago/metodopago.component';
import { CreaeditametodopagoComponent } from './components/metodopago/creaeditametodopago/creaeditametodopago.component';
import { MontototalpagosxcontratoComponent } from './components/reportes/montototalpagosxcontrato/montototalpagosxcontrato.component';
import { PagosxmetodopagoComponent } from './components/reportes/pagosxmetodopago/pagosxmetodopago.component';
import { SignupComponent } from './components/signup/signup.component';
import { InfluencerComponent } from './components/servicios/influencer/influencer.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'promohome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'promohome',
    component: LandingComponent,
  },
  {
    path: '',
    redirectTo: '/bienvenido',
    pathMatch: 'full',
  },
  {
    path: 'bienvenido',
    component: InicioComponent,
  },
  {
    path: 'contratousuario',
    component: ContratousuarioComponent,
    children: [
      {
        path: 'creareditar',
        component: CreaeditacontratousuarioComponent,
      },
      {
        path: 'actualizar/:id',
        component: ActualizarcontratousuarioComponent,
      },
      {
        path: 'insertar',
        component: RegistarcontratousuarioComponent,
      }
    ],
  },
  {
    path: 'contrato',
    component: ContratoComponent,
    children: [
      {
        path: 'contratocreaedita',
        component: ListarcontratoComponent,
      },
      {
        path: 'contratoeditar/:id',
        component:EditarcontratoComponent,
      },
    ],
  },
  {
    path: 'preguntas',
    component: PreguntasComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditapreguntasComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditapreguntasComponent,
      },
    ],
    canActivate: [segGuard],
  },
  {
    path: 'incidencias',
    component: IncidenciasComponent, // corregido el typo aquí
    children: [
      {
        path: 'nuevo',
        component: CreaeditaincidenciasComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaincidenciasComponent,
      },
    ],
    canActivate: [segGuard],
  },
  {
    path: 'metricas',
    component: MetricasComponent,
    children:[
      {
        path: 'creaeditarm',
        component: CreaeditametricaComponent,
      },
      {
        path:'actualizar/:id',
        component:ActualizarmetricaComponent
      },
      {
        path:'registrar',
        component:RegistrarmetricaComponent,
      }
    ]
  },
  {
    path:'cantidadmetricasestadocontrato',
    component:CantidadmetricasestadocontratoComponent
  },
  {
    path:'ingresostotalesporcontrato',
    component:ContratoingresostotalesComponent
  }, {
    path:'incidencias_contrato',
    component:IncidenciascontratoComponent
  },{
    path:'servciocategoria',
    component:ServicioxcategoriaComponent
  },
  {
    path:'activocontraro',
    component:ActivoComponent
  },
  {
    path:'categoriausuario',
    component:CategoriausuarioComponent
  },
  {
    path:'montototalporcontrato',
    component:MontototalpagosxcontratoComponent
  },
  {
    path:'pagospormetodopago',
    component:PagosxmetodopagoComponent
  },
  {
    path:'signup',
    component: SignupComponent,
  },
  {
    path: 'servicio',
    component: ServiciosComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaserviciosComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaserviciosComponent,
      },
      {
        path: 'serviciosinfluencer',
        component: InfluencerComponent,
      }
    ],
    canActivate: [segGuard],
  },
  {
    path: 'evaluacion',
    component: EvaluacionComponent, // corregido el typo aquí
    children: [
      {
        path: 'nuevo',
        component: CreaeditaevaluacionComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaevaluacionComponent,
      },
    ],
    canActivate: [segGuard],
  },
  {
    path: 'vertips',
    component: TipsComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaditatipsComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaditatipsComponent,
      },
    ],
    canActivate: [segGuard],
  },

  //usuario
  {
    path: 'usuario',
    component: UsuarioComponent,
    children: [
      {
        path: 'nuevo',
        component: InsertarUsuarioComponent,
      },
      {
        path: 'ediciones/:id',
        component: InsertarUsuarioComponent,
      },
    ],
    canActivate: [segGuard],
  },
  {
      path:'metodopago',component:MetodopagoComponent,
      children:[
          {
              path:'nuevo',component:CreaeditametodopagoComponent
          },
          {
              path:'ediciones/:id', component:CreaeditametodopagoComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'pago',component:PagoComponent,
      children:[
          {
              path:'nuevo',component:CreaeditapagoComponent
          },
          {
              path:'ediciones/:id', component:CreaeditapagoComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  //registrar
  {
    path: 'registrar', component: InsertarUsuarioComponent,
  }, 

  {
    path: 'listarrole', component: RolesComponent,
    children: [
        { path: 'insertarrole', component: InsertarrolesComponent },
        { path: 'ediciones/:id', component: InsertarrolesComponent },
    ],
    canActivate: [segGuard],
  }

  

];
