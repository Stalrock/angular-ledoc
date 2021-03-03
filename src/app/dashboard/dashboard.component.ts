import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Meet } from '../models/meet';
import { Patient } from '../models/patient';
import { Stat } from '../models/stat';
import { MeetsService } from '../services/meets.service';
import { PatientsService } from '../services/patients.service';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'lastIncome',
    'lastSubject',
  ];
  dataSource: MatTableDataSource<Patient>;
  meets: Array<Meet>;
  stats: Array<Stat> = [];
  tabs: Array<string> = ['1j', '7j', '30j'];

  constructor(
    private meetsService: MeetsService,
    private patientsService: PatientsService,
    private statsService: StatsService,
    private router: Router
  ) {
    this.refresh();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.meetsService.getMeets().subscribe((res) => this.meets = res);
    const periods = ['day', 'week', 'month'];
    periods.forEach((period) => {
      this.statsService.getStats(period).subscribe((res) => {
        this.stats.push(res);
      });
    });
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
