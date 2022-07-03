import { Empleado } from "./empleado";
import { Prioridad } from "./prioridad";
import { RecursoDigital } from "./recurso-digital";
import { RecursoFisico } from "./recurso-fisico";
import { TipoReunion } from "./tipo-reunion";

export class Reunion {

    _id!: string;
    horaInicio!: Date;
    horaFinal!: Date;
    prioridad!: string;
    tipoReunion!: string;
    oficina!: any;
    participantes!: string[];
    recursosDigitales!: string[];
    recursos!: string[];
    estado!: any;
    estaDeshabilitada!: boolean;
    reunionConfirmada!: boolean;

    constructor() {}

}
