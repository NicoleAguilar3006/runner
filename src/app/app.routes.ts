
import { Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ListarProductosComponent } from './componentes/productos/listar-productos/listar-productos.component';
import { SigninComponent } from './componentes/account/signin/signin.component';
import { roleGuard } from './guards/role.guard';
import { AdminComponent } from './componentes/admin/admin.component';
import { UserComponent } from './componentes/user/user.component';
import { authGuard } from './guards/auth.guard';
import { SignupComponent } from './componentes/account/signup/signup.component';
import { PasswordComponent } from './componentes/account/password/password.component';
import { FiltrarComponent } from './componentes/producto/filtrar/filtrar.component';
import { PruebaComponent } from './componentes/prueba/prueba/prueba.component';

export const routes: Routes = [
    { path: '', component: PrincipalComponent },
    { path: 'filtros', component: FiltrarComponent},
    { path: 'prueba', component: PruebaComponent},
    { path: 'sign-in', 
        component: SigninComponent ,
        canActivate: [authGuard]
    },
    { path: 'update-password', 
        component: PasswordComponent ,
        canActivate: [authGuard]
    },
    { path: 'sign-up', 
        component: SignupComponent ,
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
    { path: '**', redirectTo: '', pathMatch: 'full' }
];









