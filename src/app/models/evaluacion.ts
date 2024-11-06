  import { ContratoUsuario } from "./contratousuario";

export class Evaluacion{
    id:number=0
    calificacion: number = 0
    comentarios:string=""
     fecha_evaluacion: Date=new Date(Date.now())
    contratoUsuario: ContratoUsuario = new ContratoUsuario()
}