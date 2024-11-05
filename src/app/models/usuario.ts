import { Tips } from "./tips";

export class Usuario {
     id: number=0;
     nombre:string="";
     contrasenia:string="";
     apellidos:string="";
     telefono:number=0;
     correo:string="";
     RUC:string="";
     enabled: boolean = true;
     tips: Tips=new Tips();
}