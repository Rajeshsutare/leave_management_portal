import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HODComponent } from './components/dashboard/hod/hod.component';
import { StaffComponent } from './components/dashboard/staff/staff.component';
import { authGuard } from './guards/auth.guard';
import { WildRoutesComponent } from './components/wild-routes/wild-routes.component';
import path from 'path';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"dashboard", component:DashboardComponent,
    canActivate:[authGuard]
  },
  {path:"HOD", component:HODComponent,
    canActivate:[authGuard]
  },
  {path:"staff", component:StaffComponent,
    canActivate:[authGuard]
  },
  {path:"logout", component:LoginComponent,
    canActivate:[authGuard]
  },
  {path:"**" , component:WildRoutesComponent},
  {path:"Not-Found", redirectTo:'**'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
