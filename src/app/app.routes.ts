import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ListarProductosComponent } from './componentes/productos/listar-productos/listar-productos.component';
import { ListarModelosComponent } from './componentes/modelo/listar-modelos/listar-modelos.component';
import { ListarCategoriasComponent } from './componentes/categorias/listar-categorias/listar-categorias.component';
import { RegistrarProductosComponent } from './componentes/productos/registrar-productos/registrar-productos.component';
import { ActualizarProductosComponent } from './componentes/productos/actualizar-productos/actualizar-productos.component';

export const routes: Routes = [
    { path: '', component: PrincipalComponent },
    { path: 'listadoProductos', component: ListarProductosComponent}, 
    { path: 'listadoModelos', component: ListarModelosComponent}, 
    { path: 'listadoCategorias', component: ListarCategoriasComponent}, 
    { path: 'registroProductos', component: RegistrarProductosComponent}, 
    { path: 'actualizar/:id', component: ActualizarProductosComponent },
    // otras rutas
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
