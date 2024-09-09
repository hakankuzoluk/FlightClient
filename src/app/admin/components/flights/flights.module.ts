import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsComponent } from './flights.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from '../../../directives/admin/delete.directive';
import {MatDialogModule} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../dialogs/delete-dialog/delete-dialog.component';
import { DeleteDirectiveModule } from '../../../directives/admin/delete.directive.module';
import { MatSelectModule } from '@angular/material/select';




@NgModule({
  declarations: [
    FlightsComponent,
    CreateComponent,
    ListComponent,    
    DeleteDialogComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:FlightsComponent}
    ]),
    MatSidenavModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    MatPaginatorModule,
    MatDialogModule,
    DeleteDirectiveModule,
    MatSelectModule
  ]
})
export class FlightsModule { }
