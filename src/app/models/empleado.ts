import { Dependencia } from "./dependencia";

export class Empleado {
    _id!: string;
    apellido!: string;
    nombre!: string;
    legajo!: string;
    email!: string;
    clave!: string;
    estaEnReunion!: boolean;
    rol!: string;
    dependencias!: Array<Dependencia>;

    constructor(){
        this.estaEnReunion = false;
        this.dependencias = new Array<Dependencia>();
    }
}
