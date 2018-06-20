import { Paciente } from "./paciente";

export class Signos{
    public codigoSignos : number;
    public fecha : Date;
    public temperatura : number;
    public pulso : number;
    public ritmoRespiratorio : number;
    public paciente : Paciente;
}