import { Component, OnDestroy } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

import { MediaChange, MediaObserver } from '@angular/flex-layout';

import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  mode: MatDrawerMode = 'side';
  isOpen!: boolean;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly mediaObserver: MediaObserver) {
    this.mediaObserver
      .asObservable()
      .pipe(
        map((changes) => changes.find((change) => change.mqAlias.length === 2) as MediaChange),
        distinctUntilChanged((prev, curr) => prev.mqAlias === curr.mqAlias),
        takeUntil(this.destroy$)
      )
      .subscribe((change: MediaChange) => {
        if (change.mqAlias === 'xs') {
          this.mode = 'over';
          this.isOpen = false;
        } else {
          this.mode = 'side';
          this.isOpen = true;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
