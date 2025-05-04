import { Categoria } from "../categoria/categoria";
import { Marca } from "../marca/marca";
import { Material } from "../material/material";
import { Persona } from "../persona/persona";

export interface Modelo {
    id: number;
    descripcion: string;
    info: string;
    estado: boolean;
    precio: number;
    idCtg: number;
    idMrc: number;
    idPrn: number;
    idMtl: number;
    categoria: Categoria;
    marca: Marca;
    persona: Persona;
    material: Material;
}