import { Producto } from "./producto/producto";

export interface ProductoResponse {
    mensaje: string;
    fecha: Date;
    status: string;
    Productos: Producto[];
}
