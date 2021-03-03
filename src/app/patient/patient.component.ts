import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';
import { Patient } from '../models/patient';
import { PatientDocument } from '../models/patientDocument';
import { PatientTreatment } from '../models/patientTreatment';
import { PatientsService } from '../services/patients.service';
import { TreatmentDialogComponent } from '../treatment-dialog/treatment-dialog.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  patient: Patient;

  constructor(
    private patientsService: PatientsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.patientsService
      .getPatient(this.route.snapshot.paramMap.get('id'))
      .subscribe((res) => (this.patient = res));
  }

  deletePatient(): void {
    this.patientsService
      .deletePatient(this.route.snapshot.paramMap.get('id'))
      .subscribe(() => this.router.navigate(['/patients']));
  }

  openTreatmentDialog(): void {
    const dialogRef = this.dialog.open(TreatmentDialogComponent);

    dialogRef.afterClosed().subscribe((data: PatientTreatment) => {
      this.patient.treatments.push(data);
      const id = this.route.snapshot.paramMap.get('id');
      this.patientsService
        .updatePatient(id, this.patient)
        .subscribe(() => this.router.navigate([`/patients/${id}`]));
    });
  }

  openDocumentDialog(): void {
    const dialogRef = this.dialog.open(DocumentDialogComponent);

    dialogRef.afterClosed().subscribe((data: PatientDocument) => {
      this.patient.documents.push(data);
      const id = this.route.snapshot.paramMap.get('id');
      this.patientsService
        .updatePatient(id, this.patient)
        .subscribe(() => this.router.navigate([`/patients/${id}`]));
    });
  }
}
