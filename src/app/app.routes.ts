import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ListarProductosComponent } from './componentes/productos/listar-productos/listar-productos.component';
import { SigninComponent } from './componentes/account/signin/signin.component';
import { roleGuard } from './guards/role.guard';
import { AdminComponent } from './componentes/admin/admin.component';
import { UserComponent } from './componentes/user/user.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: PrincipalComponent },
    { path: 'listado', component: ListarProductosComponent },
    { path: 'sign-in', 
        component: SigninComponent ,
        canActivate: [authGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [roleGuard],
        data: { expectedRole: 'ADMIN' }
    },
    {
        path: 'usuario',
        component: UserComponent,
        canActivate: [roleGuard],
        data: { expectedRole: 'USER' }
        // data: { expectedRole: ['ADMIN', 'MODERATOR'] }
    },
    // otras rutas
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
