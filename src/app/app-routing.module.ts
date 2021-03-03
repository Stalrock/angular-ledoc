import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients/patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientComponent } from './patient/patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticationGuard],
    component: DashboardComponent,
  },
  {
    path: 'connexion',
    component: LoginComponent
  },
  {
    path: 'patients',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: PatientsComponent,
      },
      {
        path: 'nouveau',
        component: PatientFormComponent,
      },
      {
        path: ':id/edit',
        component: PatientFormComponent,
        data: { edit: true },
      },
      {
        path: ':id',
        component: PatientComponent
      }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
