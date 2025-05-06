
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
import { FiltroModeloComponent } from './componentes/modelo/filtro-modelo/filtro-modelo.component';
import { ListarModelosComponent } from './componentes/modelo/listar-modelos/listar-modelos.component';
import { RegistrarProductosComponent } from './componentes/productos/registrar-productos/registrar-productos.component';
import { ActualizarProductosComponent } from './componentes/productos/actualizar-productos/actualizar-productos.component';
import { ListColorComponent } from './componentes/color/list-color/list-color.component';
import { ListDistritoComponent } from './componentes/distrito/list-distrito/list-distrito.component';
import { ListMarcaComponent } from './componentes/marca/list-marca/list-marca.component';
import { ListMaterialComponent } from './componentes/material/list-material/list-material.component';
import { ListModeloComponent } from './componentes/modelo/list-modelo/list-modelo.component';
import { ListPersonaComponent } from './componentes/persona/list-persona/list-persona.component';
import { ListTallaComponent } from './componentes/talla/list-talla/list-talla.component';
import { ListTicketComponent } from './componentes/ticket/list-ticket/list-ticket.component';
import { CreateColorComponent } from './componentes/color/create-color/create-color.component';
import { CreateDistritoComponent } from './componentes/distrito/create-distrito/create-distrito.component';
import { CreateMarcaComponent } from './componentes/marca/create-marca/create-marca.component';
import { CreateMaterialComponent } from './componentes/material/create-material/create-material.component';
import { CreateModeloComponent } from './componentes/modelo/create-modelo/create-modelo.component';
import { CreatePersonaComponent } from './componentes/persona/create-persona/create-persona.component';
import { CreateTicketComponent } from './componentes/ticket/create-ticket/create-ticket.component';
import { CreateTallaComponent } from './componentes/talla/create-talla/create-talla.component';
import { ListCategoriaComponent } from './componentes/categoria/list-categoria/list-categoria.component';
import { CreateCategoriaComponent } from './componentes/categoria/create-categoria/create-categoria.component';
import { RegistrarModelosComponent } from './componentes/modelo/registrar-modelo/registrar-modelo.component';
import { EditCategoriaComponent } from './componentes/categoria/edit-categoria/edit-categoria.component';
import { EditColorComponent } from './componentes/color/edit-color/edit-color.component';
import { EditDistritoComponent } from './componentes/distrito/edit-distrito/edit-distrito.component';
import { EditMarcaComponent } from './componentes/marca/edit-marca/edit-marca.component';
import { EditMaterialComponent } from './componentes/material/edit-material/edit-material.component';
import { EditPersonaComponent } from './componentes/persona/edit-persona/edit-persona.component';
import { EditTallaComponent } from './componentes/talla/edit-talla/edit-talla.component';
import { ProductoByModeloComponent } from './componentes/producto/producto-by-modelo/producto-by-modelo.component';

export const routes: Routes = [
    { path: '', component: PrincipalComponent },
    { path: 'filtros', component: FiltrarComponent},
    
    { path: 'modelo/create', component: CreateModeloComponent},
    { path: 'modelo/list', component: FiltroModeloComponent},
    
    { path: 'producto/info/:id', component: ProductoByModeloComponent},

    { path: 'categoria/list', component: ListCategoriaComponent},
    { path: 'categoria/edit/:id', component: EditCategoriaComponent},
    { path: 'categoria/create', component: CreateCategoriaComponent},

    { path: 'color/list', component: ListColorComponent},
    { path: 'color/edit/:id', component: EditColorComponent},
    { path: 'color/create', component: CreateColorComponent},

    { path: 'distrito/list', component: ListDistritoComponent},
    { path: 'distrito/edit/:id', component: EditDistritoComponent},
    { path: 'distrito/create', component: CreateDistritoComponent},

    { path: 'marca/list', component: ListMarcaComponent},
    { path: 'marca/edit/:id', component: EditMarcaComponent},
    { path: 'marca/create', component: CreateMarcaComponent},

    { path: 'material/list', component: ListMaterialComponent},
    { path: 'material/edit/:id', component: EditMaterialComponent},
    { path: 'material/create', component: CreateMaterialComponent},

    { path: 'modelo/list', component: ListModeloComponent},
    { path: 'modelo/edit', component: ListarProductosComponent},
    { path: 'modelo/create', component: CreateModeloComponent},

    { path: 'persona/list', component: ListPersonaComponent},
    { path: 'persona/edit/:id', component: EditPersonaComponent},
    { path: 'persona/create', component: CreatePersonaComponent},

    { path: 'talla/list', component: ListTallaComponent},
    { path: 'talla/edit/:id', component: EditTallaComponent},
    { path: 'talla/create', component: CreateTallaComponent},

    { path: 'ticket/list', component: ListTicketComponent},
    { path: 'ticket/edit/:id', component: EditTallaComponent},
    { path: 'ticket/create', component: CreateTicketComponent},

    { path: 'transaccion/lista', component: ListarProductosComponent},



    { path: 'listadoModelos', component: ListarModelosComponent}, 

    { path: 'registroProductos', component: RegistrarProductosComponent}, 
    { path: 'registroModelos', component: RegistrarModelosComponent}, 

    { path: 'actualizar/:id', component: ActualizarProductosComponent },
    { path: 'productos', component: FiltroModeloComponent},
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









