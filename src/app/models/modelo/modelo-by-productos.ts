import { Categoria } from "../categoria/categoria";
import { Marca } from "../marca/marca";
import { Material } from "../material/material";
import { Persona } from "../persona/persona";
import { Producto } from "../producto/producto";
import { ProductoDTO } from "../producto/producto-dto";

export interface ModeloByProductos {
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
        productos: ProductoDTO[];
}
