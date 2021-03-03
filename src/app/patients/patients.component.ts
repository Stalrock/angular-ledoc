import { ViewChild } from '@angular/core';
import { AfterViewInit, Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientsService } from '../services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'lastIncome',
    'lastSubject'
  ];
  dataSource: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private patientsService: PatientsService, private router: Router) {
    this.refresh();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh(): void {
    this.patientsService.getPatients().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
    });
  }

  showPatient(id): void {
    this.router.navigate(['/patients', id]);
  }
}
