import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AclGuard } from "../guards/alc.guard";
import { CreateComponent } from "./create/create.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent
        },
        {
          path: 'create',
          component: CreateComponent,
          canActivate: [AclGuard]
        },
        {
          path: 'edit/:id',
          component: EditComponent,
          canActivate: [AclGuard]
        },
        {
          path: 'details/:id',
          component: DetailsComponent,
          canActivate: [AclGuard]
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'dashboard'
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MainRoutingModule {
  }