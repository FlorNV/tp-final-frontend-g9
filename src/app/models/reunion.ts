import { Empleado } from "./empleado";
import { Prioridad } from "./prioridad";
import { RecursoDigital } from "./recurso-digital";
import { RecursoFisico } from "./recurso-fisico";
import { TipoReunion } from "./tipo-reunion";

export class Reunion {

    _id!: string;
    horaInicio!: Date;
    horaFinal!: Date;
    // prioridad!: Prioridad;
    prioridad!: string;
    // tipoReunion!: TipoReunion;
    tipoReunion!: string;
    oficina!: any;
    // participantes!: Array<Empleado>;
    participantes!: string[];
    // recursos!: Array<RecursoFisico>;
    recursos!: string[];
    // recursosDigitales!: Array<RecursoDigital>;
    recursosDigitales!: string[];
    estado!: any;
    estaDeshabilitada!: boolean;
    reunionConfirmada!: boolean;

    constructor() {}

}
