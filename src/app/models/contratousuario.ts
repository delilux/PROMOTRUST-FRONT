import { Contrato } from "./contrato";
import { Usuario } from "./usuario";

export class ContratoUsuario {
    id: number = 0;
    fecha_inicio: Date = new Date(); 
    fecha_fin: Date = new Date();
    contrato: Contrato = new Contrato();
    usuario: Usuario = new Usuario();
}
