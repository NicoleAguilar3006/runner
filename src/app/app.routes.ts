import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ListarProductosComponent } from './componentes/productos/listar-productos/listar-productos.component';

export const routes: Routes = [
    { path: '', component: PrincipalComponent },
   { path: 'listado', component: ListarProductosComponent}, 
    // otras rutas
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
