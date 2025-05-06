import { Color } from "../color/color";
import { Talla } from "../talla/talla";

export interface ProductoDTO {
    id: number;
    stock: number;
    idClr: number;
    idTll: number;
    idMdl: number;
    color: Color;
    talla: Talla;
}
