import { Contrato } from "./contrato";

export class Metricas {
    id: number = 0;
    alcancepersonas: number = 0;
    ingresosgenerados: number = 0.0;
    likes: number = 0;
    comentarios: string = "";
    compartidos: number = 0;
    contrato: Contrato = new Contrato();
}
