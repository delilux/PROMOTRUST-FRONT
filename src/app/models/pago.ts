import { Contrato } from "./contrato";
import { MetodoPago } from "./metodopago";

export class Pago {
    id: number = 0;
    monto: number = 0; 
    fecha_pago: Date = new Date(Date.now());
    contrato: Contrato = new Contrato();
    metodoPago: MetodoPago = new MetodoPago();
}