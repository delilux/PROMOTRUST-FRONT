import { Contrato } from "./contrato";


export class incidencias{
    idRoom:number=0
    descripcionIncidencias:string=""
    fecha_Incidencia:Date = new Date()
    contrato: Contrato = new Contrato()
}