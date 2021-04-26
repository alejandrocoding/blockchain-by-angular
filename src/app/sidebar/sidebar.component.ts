import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FiltersService, ProjectsService } from '@services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly projectsService: ProjectsService,
    private readonly filtersService: FiltersService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    this.form = this.fb.group({
      search: '',
      categories: this.fb.array([]),
    });
    this.fetchFiltersIntoForm();
    this.reactToFormChanges();
  }

  private fetchFiltersIntoForm() {
    this.filtersService.categoryFilters$.pipe(takeUntil(this.destroy$)).subscribe((categories) => {
      categories.forEach((category) => {
        const group = this.fb.group({
          id: category.id,
          name: category.name,
          selected: category.selected,
        });
        this.categories.push(group);
      });
    });
  }

  private reactToFormChanges() {
    this.search.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((search) => this.projectsService.applyFilters(search, this.categories.value));
  }

  onCategoryFilterSelection(index: number) {
    this.categories.controls[index].value.selected = !this.categories.controls[index].value.selected;
    this.projectsService.applyFilters(this.search.value, this.categories.value);
  }

  removeFilters() {
    this.search.setValue('');
    this.categories.controls.forEach((c) => (c.value.selected = false));
  }

  get search(): FormControl {
    return this.form.controls.search as FormControl;
  }

  get categories(): FormArray {
    return this.form.controls.categories as FormArray;
  }
}
