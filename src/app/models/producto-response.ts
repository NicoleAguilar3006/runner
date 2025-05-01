import { Producto } from "./producto";

export interface ProductoResponse {
    mensaje: string;
    fecha: Date;
    status: string;
    Productos: Producto[];
}
