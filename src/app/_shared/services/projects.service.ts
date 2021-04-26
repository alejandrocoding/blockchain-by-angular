import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Project, CategoryFilter } from '@interfaces';
import projectsJSON from '@assets/data/projects.json';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  projects$ = new BehaviorSubject<Project[]>([]);
  private projects = projectsJSON.projects;

  constructor() {
    this.fetchAll();
  }

  fetchAll() {
    this.projects$.next(this.projects);
  }

  applyFilters(search: string, categories?: CategoryFilter[]) {
    let projects = this.projects;

    if (search.length) {
      projects = this.applySearchFilter(search, projects);
    }

    if (categories) {
      projects = this.applyCategoryFilters(categories, projects);
    }

    this.projects$.next(projects);
  }

  private applySearchFilter(search: string, projects: Project[]) {
    search = search.trim().toLowerCase();
    return projects.filter((project) => project.name.trim().toLowerCase().includes(search));
  }

  private applyCategoryFilters(categories: CategoryFilter[], projects: Project[]) {
    const categoryFilters = categories.filter((cat) => cat.selected);
    if (categoryFilters.length) {
      return projects.filter((project) => categoryFilters.some((cat) => cat.id === project.categoryId));
    }
    return projects;
  }
}
