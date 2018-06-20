import { DetalleConsulta } from './detalleConsulta';
import { Paciente } from "./paciente";
import { Medico } from "./medico";
import { Especialidad } from "./especialidad";

export class Consulta{
    public idConsulta: number;
    public paciente: Paciente ;
    public fecha: Date;
    public medico: Medico;
    public especialidad: Especialidad;
    public detalleConsulta: DetalleConsulta[];
}