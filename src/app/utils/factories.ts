import { ModeloByProductos } from "../models/modelo/modelo-by-productos";
import { Producto } from "../models/producto/producto";
import { ProductoDTO } from "../models/producto/producto-dto";
import { ProductoModelo } from "../models/producto/producto-modelo";

export function crearProducto(): ProductoModelo {
  return {
    id: 0,
    stock: 0,
    idClr: 0,
    idTll: 0,
    idMdl: 0,
    color: { id: 0, nombre: '' },
    talla: { id: 0, nombre: '' }
  };
}

export function crearModelo(): ModeloByProductos {
  return {
    id: 0,
    descripcion: '',
    info: '',
    estado: false,
    precio: 0,
    idCtg: 0,
    idMrc: 0,
    idPrn: 0,
    idMtl: 0,
    categoria: { id: 0, nombre: '' },
    marca: { id: 0, nombre: '' },
    persona: { id: 0, nombre: '' },
    material: { id: 0, nombre: '' },
    productos: [crearProducto()]
  };
}