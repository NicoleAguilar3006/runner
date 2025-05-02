import { Color } from "../color/color";
import { Modelo } from "../modelo/modelo";
import { Talla } from "../talla/talla";

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