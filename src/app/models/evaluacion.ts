import { Contrato } from "./contrato";

export class Evaluacion{
    id:number=0
    calificacion: number = 0;
    comentarios:string=""
    fecha_evaluacion:Date = new Date()
    contrato: Contrato = new Contrato()
}