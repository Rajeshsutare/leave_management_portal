import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HODComponent } from './components/dashboard/hod/hod.component';
import { StaffComponent } from './components/dashboard/staff/staff.component';

const routes: Routes = [
  {path:"", component: LoginComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"HOD", component:HODComponent},
  {path:"staff", component:StaffComponent},
  {path:"logout", component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
