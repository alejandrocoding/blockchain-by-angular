import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { CategoryFilter } from '@interfaces';
import filtersJSON from '@assets/data/filters.json';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  categoryFilters$ = new BehaviorSubject<CategoryFilter[]>([]);
  private categoryFilters = filtersJSON.filters;

  constructor() {
    this.fetchAll();
  }

  fetchAll() {
    this.categoryFilters$.next(this.categoryFilters);
  }
}
