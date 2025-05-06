import { Color } from "../color/color";
import { Talla } from "../talla/talla";

export interface ProductoModelo {
    id: number;
    stock: number;
    idClr: number;
    idTll: number;
    idMdl: number;
    color: Color;
    talla: Talla;
}
