import { Contrato } from "./contrato";

export class Servicios {
    id: number = 0
    nombre_servicio: string = ""
    descripcion: string = ""
    precio: number = 0
    categoria_servic: string = ""
    estado_servic: string = ""
     contrato: Contrato=new Contrato()
}
