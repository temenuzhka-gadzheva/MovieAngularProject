import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { CreateComponent } from './components/main/create/create.component';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';
import { DetailsComponent } from './components/main/details/details.component';
import { EditComponent } from './components/main/edit/edit.component';

const routes: Routes = [
  {
    path: 'dashboard', component:DashboardComponent
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch:"full"
  },
  {
    path: 'create', component:CreateComponent
  },
  {
    path: 'edit/:id', component:EditComponent
  },
  {
    path: 'details/:id', component:DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
