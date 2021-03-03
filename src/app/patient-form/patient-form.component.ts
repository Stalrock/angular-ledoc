import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentDialogComponent } from '../document-dialog/document-dialog.component';
import { PatientDocument } from '../models/patientDocument';
import { PatientTreatment } from '../models/patientTreatment';
import { PatientsService } from '../services/patients.service';
import { TreatmentDialogComponent } from '../treatment-dialog/treatment-dialog.component';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private patientsService: PatientsService,
    private fb: FormBuilder,
    private router: Router,
    public route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.route.snapshot.data.edit) {
      this.getData();
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      allergies: [''],
      height: [''],
      weight: [0],
      lastIncome: ['', [Validators.required]],
      lastSubject: ['', [Validators.required]],
      bloodGroup: [1],
      socialNumber: [''],
      notes: [''],
      documents: this.fb.array([]),
      treatments: this.fb.array([]),
    });
  }

  getData(): void {
    this.patientsService
      .getPatient(this.route.snapshot.paramMap.get('id'))
      .subscribe((res) => {
        this.form.patchValue(res);

        res.treatments.forEach((treatment, index) => {
          this.treatments.controls.push(this.fb.group({
            drug: [0],
            repeat: [0],
            duration: [0],
          }));
          this.treatments.at(index).patchValue(treatment);
        });

        res.documents.forEach((document, index) => {
          this.documents.controls.push(this.fb.group({
            name: [''],
            extension: [''],
            uploadAt: [''],
          }));
          this.documents.at(index).patchValue(document);
        });
      });
  }

  add(): void {
    if (this.route.snapshot.data.edit) {
      const id = this.route.snapshot.paramMap.get('id');
      this.patientsService
        .updatePatient(id, this.form.value)
        .subscribe(() => this.router.navigate([`/patients/${id}`]));
    } else {
      this.patientsService
        .addPatient(this.form.value)
        .subscribe(() => this.router.navigate(['/patients']));
    }
  }

  delete(): void {
    this.patientsService
      .deletePatient(this.route.snapshot.paramMap.get('id'))
      .subscribe(() => this.router.navigate(['/patients']));
  }

  openTreatmentDialog(): void {
    const dialogRef = this.dialog.open(TreatmentDialogComponent);

    dialogRef.afterClosed().subscribe((data: PatientTreatment) => {
      this.treatments.push(this.fb.group(data));
    });
  }

  openDocumentDialog(): void {
    const dialogRef = this.dialog.open(DocumentDialogComponent);

    dialogRef.afterClosed().subscribe((data: PatientDocument) => {
      this.documents.push(this.fb.group(data));
    });
  }

  get treatments(): FormArray {
    return this.form.get('treatments') as FormArray;
  }

  get documents(): FormArray {
    return this.form.get('documents') as FormArray;
  }
}
