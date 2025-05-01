import { Color } from "./color";
import { Modelo } from "./modelo";
import { Talla } from "./talla";

export interface Producto {
    id: number;
    stock: number;
    idClr: number;
    idTll: number;
    idMdl: number;
    objColor: Color;
    objTalla: Talla;
    objModelo: Modelo;
}
