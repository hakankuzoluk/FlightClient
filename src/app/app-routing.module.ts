import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {
    path : "admin", component:LayoutComponent, children:[
      {path:"", component:DashboardComponent, canActivate : [AuthGuard]},
      {path:'users', loadChildren: () => import('./admin/components/users/users.module').then(module => module.UsersModule), canActivate : [AuthGuard]},
      {path:"flights", loadChildren: () => import("./admin/components/flights/flights.module").then(module => module.FlightsModule), canActivate : [AuthGuard]},
      {path:"reservations", loadChildren: () => import("./admin/components/reservations/reservations.module").then(module => module.ReservationsModule), canActivate : [AuthGuard]},
      {path:"authorize-menu", loadChildren: () => import("./admin/components/authorize-menu/authorize-menu.module").then(module => module.AuthorizeMenuModule), canActivate : [AuthGuard]},
      {path:"role", loadChildren: () => import("./admin/components/role/role.module").then(module => module.RoleModule), canActivate : [AuthGuard]}
    ], canActivate : [AuthGuard]
  },
  { path: '', component: HomeComponent },
  { path: 'flights', loadChildren: () => import('./ui/components/flights/flights.module').then(module => module.FlightsModule) },
  { path: 'flights/:pageNo', loadChildren: () => import('./ui/components/flights/flights.module').then(module => module.FlightsModule) },
  { path: 'register', loadChildren: () => import('./ui/components/register/register.module').then(module => module.RegisterModule) },
  { path: 'login', loadChildren: () => import('./ui/components/login/login.module').then(module => module.LoginModule) },
  { path: 'reservation-list', loadChildren: () => import('./ui/components/reservation-list/reservation-list.module').then(module => module.ReservationListModule) }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
