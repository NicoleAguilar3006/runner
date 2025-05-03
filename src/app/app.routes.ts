
import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ListarProductosComponent } from './componentes/productos/listar-productos/listar-productos.component';
import { ListarModelosComponent } from './componentes/modelo/listar-modelos/listar-modelos.component';
import { ListarCategoriasComponent } from './componentes/categorias/listar-categorias/listar-categorias.component';
import { RegistrarProductosComponent } from './componentes/productos/registrar-productos/registrar-productos.component';
import { ActualizarProductosComponent } from './componentes/productos/actualizar-productos/actualizar-productos.component';

import { RegistrarModelosComponent } from './componentes/modelo/registrar-modelo/registrar-modelo.component'; 
import { ActualizarModeloComponent } from './componentes/modelo/actualizar-modelo/actualizar-modelo.component';

import { ListarMarcasComponent } from './componentes/marcas/listar-marcas/listar-marcas.component';
import { RegistrarCategoriasComponent } from './componentes/categorias/registrar-categorias/registrar-categorias.component';
import { RegistrarMarcaComponent } from './componentes/marcas/registrar-marca/registrar-marca.component';


export const routes: Routes = [
    { path: '', component: PrincipalComponent },
    { path: 'listadoProductos', component: ListarProductosComponent}, 
    { path: 'listadoModelos', component: ListarModelosComponent}, 
    { path: 'listadoCategorias', component: ListarCategoriasComponent}, 
    { path: 'listadoMarcas', component: ListarMarcasComponent}, 

    { path: 'registroProductos', component: RegistrarProductosComponent}, 
    { path: 'registroCategorias', component: RegistrarCategoriasComponent},
    { path: 'registroMarcas', component: RegistrarMarcaComponent},

    { path: 'actualizar/:id', component: ActualizarProductosComponent },
    { path: 'registrarModelos', component: RegistrarModelosComponent }, 
    { path: 'actualizarModelo/:id', component: ActualizarModeloComponent }, 
    // otras rutas
    {path: '**', redirectTo: '', pathMatch: 'full'}
];









