import { Tips } from "./tips";

export class Signup {
     id: number=0;
     nombre:string="";
     contrasenia:string="";
     apellidos:string="";
     telefono:number=0;
     correo:string="";
     enabled: boolean = true;
     tips: Tips | null = null;
}