import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
// Components
import { PatientsComponent } from './patients/patients.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientComponent } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TreatmentDialogComponent } from './treatment-dialog/treatment-dialog.component';
// Services
import { PatientsService } from './services/patients.service';
import { MeetsService } from './services/meets.service';
import { StatsService } from './services/stats.service';
import { UserService } from './services/user.service';
import { TokenStorageService } from './services/token-storage.service';
// Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { AppInterceptor } from './services/app.interceptor';
import { DocumentDialogComponent } from './document-dialog/document-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientFormComponent,
    PatientComponent,
    DashboardComponent,
    TreatmentDialogComponent,
    LoginComponent,
    DocumentDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatDialogModule,
  ],
  providers: [
    PatientsService,
    MeetsService,
    StatsService,
    UserService,
    TokenStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
