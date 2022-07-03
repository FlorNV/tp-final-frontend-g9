import { Reunion } from "./reunion";

export class Oficina {

    _id!: string;
    nombre!: string;
    estaOcupada!: boolean;
    historialDeReuniones!: Array<Reunion>;
    reunion!: Reunion;

}
