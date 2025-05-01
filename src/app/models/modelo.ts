import { Categoria } from "./categoria";
import { Marca } from "./marca";
import { Material } from "./material";
import { Persona } from "./persona";

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
    objCategoria: Categoria;
    objMarca: Marca;
    objPersona: Persona;
    objMaterial: Material;
}
