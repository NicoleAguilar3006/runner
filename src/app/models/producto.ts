import { Color } from "./color";
import { Modelo } from "./modelo";
import { Talla } from "./talla";

export interface Producto {
    id: number;
    stock: number;
    idClr: number;
    idTll: number;
    idMdl: number;
    color: Color;
    talla: Talla;
    modelo: Modelo;
}
