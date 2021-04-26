import { NgModule } from '@angular/core';

import { FlexModule } from '@angular/flex-layout';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

const modules = [
  MatToolbarModule,
  MatSidenavModule,
  MatDividerModule,
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
];

@NgModule({
  imports: [FlexModule, ...modules],
  exports: [FlexModule, ...modules],
})
export class MaterialModule {}
