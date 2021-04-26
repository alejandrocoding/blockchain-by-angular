import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Project } from '@interfaces';
import { ProjectsService } from '@services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  projects: Project[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.projects$.pipe(takeUntil(this.destroy$)).subscribe((projects) => (this.projects = projects));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openURL(url: string) {
    window.open(url, '_blank');
  }
}
